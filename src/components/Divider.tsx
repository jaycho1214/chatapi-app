import {Box} from '@/components/Box';
import {Theme} from '@/lib/theme';
import {BoxProps} from '@shopify/restyle';

export type DividerProps = {
  horizontal?: boolean;
} & BoxProps<Theme>;

export function Divider({horizontal, ...rest}: DividerProps) {
  return (
    <Box
      height={horizontal ? 1 : 'auto'}
      width={horizontal ? 'auto' : 1}
      backgroundColor="border"
      {...rest}
    />
  );
}
