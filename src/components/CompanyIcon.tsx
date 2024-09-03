import {companies} from '@/lib/models';
import OpenAISvg from '@/assets/openai.svg';
import AnthropicSvg from '@/assets/anthropic.svg';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/lib/theme';

export function CompanyIcon({
  company,
  size,
}: {
  company: (typeof companies)[number];
  size: number;
}) {
  const theme = useTheme<Theme>();

  if (company === 'anthropic') {
    return (
      <AnthropicSvg
        width={size}
        height={size}
        stroke={theme.colors.text}
        fill={theme.colors.text}
      />
    );
  }
  return (
    <OpenAISvg
      width={size}
      height={size}
      stroke={theme.colors.text}
      fill={theme.colors.text}
    />
  );
}
