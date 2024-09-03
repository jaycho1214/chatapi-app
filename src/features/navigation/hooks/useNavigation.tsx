import {
  NavigationProp,
  useNavigation as useNativeNavigation,
} from '@react-navigation/native';
import {RootParamList} from '@react-navigation/native-stack';

export function useNavigation() {
  return useNativeNavigation<NavigationProp<RootParamList>>();
}
