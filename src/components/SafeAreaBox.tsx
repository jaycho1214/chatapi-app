import {Theme} from '@/lib/theme';
import {createBox} from '@shopify/restyle';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

export const SafeAreaBox = createBox<Theme, SafeAreaViewProps>(SafeAreaView);
