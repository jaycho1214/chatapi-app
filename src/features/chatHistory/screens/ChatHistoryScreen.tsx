import {Box} from '@/components/Box';
import {Divider} from '@/components/Divider';
import {Text} from '@/components/Text';
import {useNavigation} from '@/features/navigation/hooks/useNavigation';
import {Chat} from '@/lib/models';
import {Theme} from '@/lib/theme';
import {useLLMModel} from '@/stores/useLLMModel';
import {Cancel01Icon, PencilEdit01Icon} from '@hugeicons/react-native';
import {useTheme} from '@shopify/restyle';
import {useCallback} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function ChatHistoryScreen() {
  const {chats, chatId, setChat, setModel} = useLLMModel();
  const {top, bottom} = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const navigation = useNavigation();

  const onPress = useCallback(
    (chat: Chat) => {
      setChat(chat.id);
      setModel(chat.model);
      navigation.goBack();
    },
    [navigation, setChat, setModel],
  );

  const onPressClear = useCallback(() => {
    Alert.alert('Clear Chat', 'Are you sure you want to clear this chat?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          useLLMModel.setState({chatId: null, chats: {}});
          navigation.goBack();
        },
      },
    ]);
  }, [navigation]);

  return (
    <Box flex={1} backgroundColor="sheetBackground" style={{paddingTop: top}}>
      <FlatList
        style={{flex: 1}}
        data={Object.values(chats)}
        ListHeaderComponent={
          <Box mb="m">
            <TouchableOpacity
              onPress={() => {
                setChat(null);
                navigation.goBack();
              }}>
              <Box flexDirection="row" mx="m" py="m" px="s" borderRadius={10}>
                <PencilEdit01Icon color={theme.colors.text} size={20} />
                <Text variant="header" ml="m">
                  New Chat
                </Text>
              </Box>
            </TouchableOpacity>
            <Divider my="xs" horizontal />
          </Box>
        }
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => onPress(item)}>
              <Box
                mx="m"
                py="m"
                px="s"
                borderRadius={10}
                backgroundColor={
                  chatId === item.id ? 'background' : 'sheetBackground'
                }>
                <Text fontSize={14} fontWeight="bold">
                  {item.title ?? `Chat-${item.id.split('-')[0]}`}
                </Text>
              </Box>
            </TouchableOpacity>
          );
        }}
      />
      <Divider horizontal />
      <TouchableOpacity onPress={onPressClear}>
        <Box
          flexDirection="row"
          alignItems="center"
          px="m"
          py="l"
          style={{marginBottom: bottom}}>
          <Cancel01Icon size={20} color={theme.colors.error} />
          <Text ml="m" fontWeight="bold" color="text">
            Clear Chat
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
