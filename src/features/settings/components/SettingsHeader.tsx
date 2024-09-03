import {ArrowLeft01Icon, InformationCircleIcon} from '@hugeicons/react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {IconButton} from '@/components/IconButton';
import {SafeAreaBox} from '@/components/SafeAreaBox';
import {Text} from '@/components/Text';
import {useNavigation} from '@/features/navigation/hooks/useNavigation';
import {Theme} from '@/lib/theme';
import {useTheme} from '@shopify/restyle';
import {Portal} from '@gorhom/portal';
import {
  InformationSheet,
  InformationSheetMethods,
} from '@/features/settings/components/sheets/InformationSheet';
import {useRef} from 'react';

export function SettingsHeader({}: NativeStackHeaderProps) {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const informationSheetRef = useRef<InformationSheetMethods>(null);

  return (
    <SafeAreaBox
      backgroundColor="background"
      edges={['top']}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <IconButton
        icon={ArrowLeft01Icon}
        size={20}
        style={{
          paddingHorizontal: theme.spacing.m,
          paddingVertical: theme.spacing.s,
        }}
        onPress={() => navigation.goBack()}
      />
      <Text variant="header">Settings</Text>
      <IconButton
        icon={InformationCircleIcon}
        size={20}
        onPress={() => informationSheetRef.current?.showModal()}
        style={{
          paddingHorizontal: theme.spacing.m,
          paddingVertical: theme.spacing.s,
        }}
      />
      <Portal>
        <InformationSheet ref={informationSheetRef} />
      </Portal>
    </SafeAreaBox>
  );
}
