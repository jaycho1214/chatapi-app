import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@/features/home/screens/HomeScreen';
import {HomeHeader} from '@/features/home/components/HomeHeader';
import {SettingsScreen} from '@/features/settings/screens/SettingsScreen';
import {SettingsHeader} from '@/features/settings/components/SettingsHeader';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ChatHistoryScreen} from '@/features/chatHistory/screens/ChatHistoryScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

declare module '@react-navigation/native-stack' {
  interface RootParamList {
    Home: undefined;
    Settings: undefined;
  }
}

const Drawer = createDrawerNavigator();
const {Navigator, Screen} = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={() => <ChatHistoryScreen />}
      screenOptions={({route}) => {
        const r = getFocusedRouteNameFromRoute(route) ?? 'Home';
        return {
          headerShown: false,
          swipeEnabled: r === 'Home',
        };
      }}>
      <Drawer.Screen name="Root" component={RootStackNavigator} />
    </Drawer.Navigator>
  );
}

export function RootStackNavigator() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{header: HomeHeader}}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{header: SettingsHeader}}
      />
    </Navigator>
  );
}
