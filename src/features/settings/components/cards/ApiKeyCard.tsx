import {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box} from '@/components/Box';
import {Text} from '@/components/Text';
import {useApiKey} from '@/stores/useApiKey';
import {companies} from '@/lib/models';
import {CompanyIcon} from '@/components/CompanyIcon';

export type ApiKeyCardProps = {
  company: (typeof companies)[number];
  onPress?: () => void;
};

export function ApiKeyCard({company, onPress}: ApiKeyCardProps) {
  const {keys} = useApiKey();

  const text = useMemo(() => {
    if (company === 'anthropic') {
      return 'Anthropic';
    }
    return 'OpenAI';
  }, [company]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" px="m">
        <CompanyIcon company={company} size={20} />
        <Box flex={1}>
          <Text ml="s" fontSize={16} color="text">
            {text}
          </Text>
        </Box>
        <Text ml="s" fontSize={12} color="placeholder">
          {keys[company] == null ? 'Set API Key' : 'Ready'}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
