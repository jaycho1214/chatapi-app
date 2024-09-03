import {Theme} from '@/lib/theme';
import {createBox} from '@shopify/restyle';
import {KeyboardAvoidingView, KeyboardAvoidingViewProps} from 'react-native';

export const KeyboardAvoidingBox = createBox<Theme, KeyboardAvoidingViewProps>(
  KeyboardAvoidingView,
);
