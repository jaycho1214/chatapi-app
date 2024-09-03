import {Box} from '@/components/Box';
import {CompanyIcon} from '@/components/CompanyIcon';
import Markdown from 'react-native-markdown-display';
import {Text} from '@/components/Text';
import {models} from '@/lib/models';
import {useLLMModel} from '@/stores/useLLMModel';
import {FlatList} from 'react-native-gesture-handler';
import {useMarkdownStyle} from '@/hooks/useMarkdownStyle';
import {useEffect, useRef} from 'react';

export function ChatMessages() {
  const {chatId, chats} = useLLMModel();
  const flatlistRef = useRef<FlatList | null>(null);
  const chat = chatId ? chats[chatId] : null;
  const markdownStyle = useMarkdownStyle();

  useEffect(() => {
    if (chat?.receiving) {
      const r = flatlistRef.current;
      const interval = setInterval(() => {
        r?.scrollToEnd({animated: true});
      }, 1000);
      return () => {
        clearInterval(interval);
        r?.scrollToEnd({animated: true});
      };
    }
  }, [chat?.receiving]);

  return (
    <Box flex={1}>
      <FlatList
        ref={flatlistRef}
        data={chat?.messages ?? []}
        renderItem={({item}) => {
          if (item.role === 'system') {
            return null;
          } else if (item.role === 'assistant') {
            return (
              <Box
                flexDirection="row"
                mx="s"
                my="xs"
                py="m"
                pr="l"
                alignSelf="flex-start">
                <Box
                  borderRadius={9999}
                  borderColor="border"
                  borderWidth={2}
                  alignSelf="flex-start"
                  p="s">
                  <CompanyIcon
                    company={models[chat?.model ?? 'gpt-4o'].company}
                    size={20}
                  />
                </Box>
                <Box ml="s" mr="l" style={{marginTop: 0}}>
                  {item.error ? (
                    <Text color="error">{item.error}</Text>
                  ) : (
                    <Markdown style={markdownStyle}>
                      {item.content ?? ''}
                    </Markdown>
                  )}
                </Box>
              </Box>
            );
          } else {
            return (
              <Box
                mx="m"
                my="xs"
                px="m"
                py="s"
                backgroundColor="cardBackground"
                borderRadius={20}
                alignSelf="flex-end">
                <Text fontSize={16} selectable>
                  {item.content}
                </Text>
              </Box>
            );
          }
        }}
      />
    </Box>
  );
}
