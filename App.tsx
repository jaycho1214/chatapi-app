import {RootNavigator} from '@/features/navigation/RootStackNavigator';
import {useHydration} from '@/hooks/useHydration';
import {useSettingsTheme} from '@/hooks/useSettingsTheme';
import {PortalProvider} from '@gorhom/portal';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

function App() {
  const theme = useSettingsTheme();
  const hydrated = useHydration();

  useEffect(() => {
    if (hydrated) {
      RNBootSplash.hide({fade: true});
    }
  }, [hydrated]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <PortalProvider>
              <RootNavigator />
            </PortalProvider>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
