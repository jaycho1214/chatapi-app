import {SUMMARY_GENERATE_SYSTEM_PROMPT} from '@/lib/constants';
import {Chat, companies, models} from '@/lib/models';
import {useApiKey} from '@/stores/useApiKey';
import {useLLMModel} from '@/stores/useLLMModel';
import EventSource from 'react-native-sse';

export async function processChat() {
  try {
    const {chatId, chats} = useLLMModel.getState();
    const chat = chatId ? chats[chatId] : null;
    if (chat == null) {
      throw new Error('No chat found');
    }
    useLLMModel.setState(state => {
      if (state.chatId != null) {
        state.chats[state.chatId].receiving = true;
      }
      return {...state};
    });
    const company = models[chat.model].company;
    const apiKey = useApiKey.getState().keys[company];
    if (apiKey == null) {
      throw new Error('No API key found');
    }
    if (chat.title == null) {
      generateSummary({company, chat, apiKey});
    }
    if (company === 'openai') {
      await runOpenAIStream({chat, apiKey});
    } else if (company === 'anthropic') {
      await runAnthropicStream({chat, apiKey});
    }
  } catch (err) {
    console.warn({err});
    useLLMModel.setState(state => {
      if (state.chatId != null) {
        state.chats[state.chatId].receiving = false;
        state.chats[state.chatId].messages[
          state.chats[state.chatId].messages.length - 1
        ] = {error: `${err}`, role: 'assistant', content: ''};
      }
      return {...state};
    });
  }
}

async function generateSummary(args: {
  company: (typeof companies)[number];
  chat: Chat;
  apiKey: string;
}) {
  if (args.company === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SUMMARY_GENERATE_SYSTEM_PROMPT,
          },
          {role: 'user', content: args.chat.messages[0].content},
        ],
        stream: false,
      }),
      headers: {
        Authorization: `Bearer ${args.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    useLLMModel.setState(state => {
      state.chats[args.chat.id].title = data.choices[0].message.content;
      return {...state};
    });
  } else if (args.company === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        system: SUMMARY_GENERATE_SYSTEM_PROMPT,
        messages: [{role: 'user', content: args.chat.messages[0].content}],
        max_tokens: 256,
        stream: false,
      }),
      headers: {
        'x-api-key': args.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
    });
    const data = await res.json();
    useLLMModel.setState(state => {
      state.chats[args.chat.id].title = data.content[0].text;
      return {...state};
    });
  }
}

async function runOpenAIStream({chat, apiKey}: {chat: Chat; apiKey: string}) {
  return new Promise<void>((resolve, reject) => {
    const es = new EventSource('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: chat.model,
        messages: [
          {role: 'system', content: 'Return the response in markdown'},
          ...chat.messages.filter(m => m.error == null),
        ],
        stream: true,
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      pollingInterval: 0,
    });
    useLLMModel.setState(state => {
      state.chats[chat.id].messages.push({role: 'assistant', content: ''});
      return {...state};
    });
    es.addEventListener('message', event => {
      if (event.data != null && event.data !== '[DONE]') {
        const data = JSON.parse(event.data);
        useLLMModel.setState(state => {
          if (state.chatId != null) {
            state.chats[state.chatId].messages[
              state.chats[state.chatId].messages.length - 1
            ].content += data.choices[0].delta.content ?? '';
          }
          return {...state};
        });
      } else {
        es.close();
        resolve();
      }
    });
    es.addEventListener('close', _event => {
      useLLMModel.setState(state => {
        if (state.chatId != null) {
          state.chats[state.chatId].receiving = false;
        }
        return {...state};
      });
    });
    es.addEventListener('error', event => {
      if (event.type === 'error') {
        reject(event.message);
      } else if (event.type === 'timeout') {
        reject(event.type);
      } else {
        reject(event.message);
      }
    });
  });
}

async function runAnthropicStream({
  chat,
  apiKey,
}: {
  chat: Chat;
  apiKey: string;
}) {
  return new Promise<void>((resolve, reject) => {
    const es = new EventSource<
      | 'message_start'
      | 'content_block_start'
      | 'content_block_delta'
      | 'content_block_stop'
      | 'message_delta'
      | 'message_stop'
      | 'error'
    >('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      body: JSON.stringify({
        model: chat.model,
        messages: [...chat.messages.filter(m => m.error == null)],
        max_tokens: 1024,
        stream: true,
      }),
      withCredentials: true,
      pollingInterval: 0,
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
    });
    useLLMModel.setState(state => {
      state.chats[chat.id].messages.push({role: 'assistant', content: ''});
      return {...state};
    });
    es.addEventListener('content_block_delta', event => {
      const data = JSON.parse(event.data ?? '{}');
      useLLMModel.setState(state => {
        if (state.chatId != null) {
          state.chats[state.chatId].messages[
            state.chats[state.chatId].messages.length - 1
          ].content += data?.delta?.text ?? '';
        }
        return {...state};
      });
    });
    es.addEventListener('message_stop', _event => {
      es.close();
      resolve();
    });
    es.addEventListener('close', _event => {
      useLLMModel.setState(state => {
        if (state.chatId != null) {
          state.chats[state.chatId].receiving = false;
        }
        return {...state};
      });
    });
    es.addEventListener('error', event => {
      if (event.type === 'error') {
        reject(event.message);
      } else if (event.type === 'timeout') {
        reject(event.type);
      } else {
        reject(event.message);
      }
    });
  });
}
