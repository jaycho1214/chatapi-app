import {Box} from '@/components/Box';
import {Text} from '@/components/Text';
import {Theme} from '@/lib/theme';
import {useSettings} from '@/stores/useSettings';
import {useTheme} from '@shopify/restyle';
import {useCallback} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

export function ThemeSelector() {
  const theme = useTheme<Theme>();
  const {theme: settingsTheme, setTheme} = useSettings();

  const onPress = useCallback(
    (theme: 'light' | 'dark' | 'system') => () => {
      setTheme(theme);
    },
    [setTheme],
  );

  const buildButtonStyle: (
    t: 'light' | 'dark' | 'system',
  ) => StyleProp<ViewStyle> = useCallback(
    t => {
      const selected = settingsTheme === t;
      const baseTheme: StyleProp<ViewStyle> = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
        paddingVertical: theme.spacing.s,
        margin: selected ? 5 : 0,
        backgroundColor: 'red',
      };
      return {
        ...baseTheme,
        color: selected ? theme.colors.buttonText : theme.colors.cardBackground,
        backgroundColor: selected
          ? theme.colors.buttonBackground
          : theme.colors.cardBackground,
      };
    },
    [theme, settingsTheme],
  );

  const buildTextStyle = useCallback(
    (t: 'light' | 'dark' | 'system') => {
      const selected = settingsTheme === t;
      if (selected) {
        return {
          color: theme.colors.buttonText,
          fontWeight: 'bold',
        } as StyleProp<TextStyle>;
      }
    },
    [theme, settingsTheme],
  );

  return (
    <Box
      flexDirection="row"
      backgroundColor="cardBackground"
      mt="xs"
      borderRadius={9999}>
      <TouchableOpacity
        style={buildButtonStyle('light')}
        onPress={onPress('light')}>
        <Text style={buildTextStyle('light')}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buildButtonStyle('dark')}
        onPress={onPress('dark')}>
        <Text style={buildTextStyle('dark')}>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buildButtonStyle('system')}
        onPress={onPress('system')}>
        <Text style={buildTextStyle('system')}>System</Text>
      </TouchableOpacity>
    </Box>
  );
}
