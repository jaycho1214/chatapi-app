import {KeyboardAvoidingBox} from '@/components/KeyboardAvoidingBox';
import {SafeAreaBox} from '@/components/SafeAreaBox';
import {ChatMessages} from '@/features/home/components/ChatMessages';
import {InputBox} from '@/features/home/components/InputBox';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function HomeScreen() {
  const {bottom} = useSafeAreaInsets();

  return (
    <SafeAreaBox flex={1} backgroundColor="background" edges={['bottom']}>
      <KeyboardAvoidingBox
        flex={1}
        behavior="padding"
        keyboardVerticalOffset={bottom + 60}>
        <ChatMessages />
        <InputBox />
      </KeyboardAvoidingBox>
    </SafeAreaBox>
  );
}
