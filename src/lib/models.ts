export const companies = ['openai', 'anthropic'] as const;

export const companyInfo: {
  [key in (typeof companies)[number]]: {
    name: string;
  };
} = {
  openai: {
    name: 'OpenAI',
  },
  anthropic: {
    name: 'Anthropic',
  },
};

export type LLMModel = {
  model: string;
  name: string;
  company: (typeof companies)[number];
};

export const models: {[key: string]: LLMModel} = {
  'gpt-4o': {model: 'gpt-4o', name: 'GPT 4o', company: 'openai'},
  'gpt-4o-mini': {model: 'gpt-4o-mini', name: 'GPT 4o Mini', company: 'openai'},
  'gpt-4o-turbo': {
    model: 'gpt-4o-turbo',
    name: 'GPT 4o Turbo',
    company: 'openai',
  },
  'claude-3-5-sonnet-20240620': {
    model: 'claude-3-5-sonnet-20240620',
    name: 'Claude 3.5 Sonnet',
    company: 'anthropic',
  },
  'claude-3-opus-20240229': {
    model: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    company: 'anthropic',
  },
  'claude-3-sonnet-20240229': {
    model: 'claude-3-sonnet-20240229',
    name: 'Claude 3 Sonnet',
    company: 'anthropic',
  },
};

export type Chat = {
  id: string;
  model: keyof typeof models;
  title?: string;
  receiving?: boolean;
  messages: ChatMessage[];
};

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  error?: string;
};
