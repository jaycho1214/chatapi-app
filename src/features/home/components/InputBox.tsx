import {Box} from '@/components/Box';
import {IconButton} from '@/components/IconButton';
import {processChat} from '@/lib/api';
import {Theme} from '@/lib/theme';
import {useLLMModel} from '@/stores/useLLMModel';
import {ArrowUp02Icon} from '@hugeicons/react-native';
import {useTheme} from '@shopify/restyle';
import {useCallback, useState} from 'react';
import {ActivityIndicator, Keyboard, TextInput} from 'react-native';
import uuid from 'react-native-uuid';

export function InputBox() {
  const [text, setText] = useState('');
  const theme = useTheme<Theme>();
  const {chatId, chats, modelId} = useLLMModel();
  const chat = chatId ? chats[chatId] : null;

  const onPress = useCallback(async () => {
    let prevText = text;
    useLLMModel.setState(state => {
      if (state.modelId == null) {
        return state;
      }
      if (state.chatId == null) {
        state.chatId = uuid.v4().toString();
      }
      const chat = state.chats[state.chatId];
      if (chat == null) {
        state.chats[state.chatId] = {
          id: state.chatId,
          messages: [{role: 'user', content: text}],
          model: state.modelId,
        };
      } else {
        state.chats[state.chatId].messages.push({role: 'user', content: text});
      }
      return {...state};
    });
    Keyboard.dismiss();
    try {
      setText('');
      await processChat();
    } catch (err) {
      setText(prevText);
    }
  }, [text, setText]);

  return (
    <Box flexDirection="row" alignItems="center" px="m" py="xs" gap="s">
      {/* <IconButton icon={Add01Icon} variant="filled" strokeWidth={3} /> */}
      <Box
        flex={1}
        borderRadius={20}
        borderColor="border"
        borderWidth={1}
        p="s">
        <TextInput
          placeholder="Message"
          style={{
            fontSize: 16,
            color: theme.colors.text,
          }}
          value={text}
          onChangeText={setText}
          placeholderTextColor={theme.colors.placeholder}
        />
      </Box>
      {chat?.receiving ? (
        <Box px="xs">
          <ActivityIndicator />
        </Box>
      ) : (
        <IconButton
          icon={ArrowUp02Icon}
          onPress={onPress}
          variant="filled"
          disabled={text.trim().length === 0 || modelId == null}
          strokeWidth={3}
        />
      )}
    </Box>
  );
}
