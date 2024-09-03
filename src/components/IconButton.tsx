import {Theme} from '@/lib/theme';
import {HugeiconsProps} from '@hugeicons/react-native';
import {useTheme} from '@shopify/restyle';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Svg from 'react-native-svg';

export type IconButtonProps = {
  onPress?: () => void | Promise<void>;
  icon: React.ForwardRefExoticComponent<
    HugeiconsProps & React.RefAttributes<Svg>
  >;
  variant?: 'plain' | 'filled';
  color?: string;
  size?: number;
  strokeWidth?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  onPress,
  icon: Icon,
  variant = 'plain',
  color,
  size = 16,
  strokeWidth = 2,
  disabled = false,
  style,
}: IconButtonProps) {
  const {colors, spacing} = useTheme<Theme>();

  if (disabled) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        variant === 'filled' && {
          backgroundColor: colors.buttonBackground,
          padding: spacing.xs,
        },
        disabled && {
          backgroundColor: colors.disabled,
        },
        style,
      ]}>
      <Icon
        color={color ?? variant === 'filled' ? colors.buttonText : colors.text}
        size={size}
        variant="stroke"
        strokeWidth={strokeWidth}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
  },
});
