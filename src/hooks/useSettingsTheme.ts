import lightTheme, {darkTheme} from '@/lib/theme';
import {useSettings} from '@/stores/useSettings';
import {useColorScheme} from 'react-native';

export function useSettingsTheme() {
  const {theme} = useSettings();
  const systemTheme = useColorScheme();

  if (theme === 'light') {
    return lightTheme;
  } else if (theme === 'dark') {
    return darkTheme;
  } else if (theme === 'system') {
    return systemTheme === 'light' ? lightTheme : darkTheme;
  }
}
