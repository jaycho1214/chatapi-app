import {
  ArrowRight01Icon,
  Chatting01Icon,
  Settings01Icon,
} from '@hugeicons/react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {Box} from '@/components/Box';
import {IconButton} from '@/components/IconButton';
import {SafeAreaBox} from '@/components/SafeAreaBox';
import {Text} from '@/components/Text';
import {useNavigation} from '@/features/navigation/hooks/useNavigation';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/lib/theme';
import {
  ModelPicker,
  ModelPickerMethods,
} from '@/features/home/components/ModelPicker';
import {useRef} from 'react';
import {Portal} from '@gorhom/portal';
import {useLLMModel} from '@/stores/useLLMModel';
import {models} from '@/lib/models';
import {CompanyIcon} from '@/components/CompanyIcon';
import {DrawerActions} from '@react-navigation/native';

export function HomeHeader({}: NativeStackHeaderProps) {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const modelPickerRef = useRef<ModelPickerMethods>(null);
  const {modelId} = useLLMModel();
  const model = modelId ? models[modelId] : null;

  return (
    <SafeAreaBox
      backgroundColor="background"
      edges={['top']}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <IconButton
        icon={Chatting01Icon}
        size={20}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{
          paddingHorizontal: theme.spacing.m,
          paddingVertical: theme.spacing.s,
        }}
      />
      <TouchableOpacity onPress={() => modelPickerRef.current?.show()}>
        <Box flexDirection="row" alignItems="center">
          {model?.company && <CompanyIcon company={model.company} size={20} />}
          <Text variant="header" ml="s">
            {model?.name ?? 'Select Model'}
          </Text>
          <ArrowRight01Icon color={theme.colors.text} size={20} />
        </Box>
      </TouchableOpacity>
      <IconButton
        icon={Settings01Icon}
        size={20}
        onPress={() => navigation.navigate('Settings')}
        style={{
          paddingHorizontal: theme.spacing.m,
          paddingVertical: theme.spacing.s,
        }}
      />
      <Portal>
        <ModelPicker ref={modelPickerRef} />
      </Portal>
    </SafeAreaBox>
  );
}
