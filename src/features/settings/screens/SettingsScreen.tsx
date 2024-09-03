import {Box} from '@/components/Box';
import {Divider} from '@/components/Divider';
import {Text} from '@/components/Text';
import {ApiKeyCard} from '@/features/settings/components/cards/ApiKeyCard';
import {ThemeSelector} from '@/features/settings/components/cards/ThemeSelector';
import {
  ApiKeySheet,
  ApiKeySheetMethods,
} from '@/features/settings/components/sheets/ApiKeySheet';
import {useTheme} from '@shopify/restyle';
import {useRef} from 'react';
import {ScrollView} from 'react-native';

export function SettingsScreen() {
  const theme = useTheme();
  const apiKeySheetRef = useRef<ApiKeySheetMethods>(null);

  return (
    <Box flex={1}>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
        }}
        contentContainerStyle={{
          paddingVertical: theme.spacing.l,
          paddingHorizontal: theme.spacing.m,
          gap: theme.spacing.m,
        }}>
        <Box>
          <Text ml="m" variant="header" color="text">
            API Keys
          </Text>
          <Box
            backgroundColor="cardBackground"
            mt="xs"
            py="m"
            borderRadius={10}>
            <ApiKeyCard
              company="openai"
              onPress={() => apiKeySheetRef.current?.showModal('openai')}
            />
            <Divider horizontal my="m" />
            <ApiKeyCard
              company="anthropic"
              onPress={() => apiKeySheetRef.current?.showModal('anthropic')}
            />
          </Box>
        </Box>
        <Box>
          <Text ml="m" variant="header">
            Theme
          </Text>
          <ThemeSelector />
        </Box>
      </ScrollView>
      <ApiKeySheet ref={apiKeySheetRef} />
    </Box>
  );
}
