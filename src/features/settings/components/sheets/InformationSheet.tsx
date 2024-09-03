import {Box} from '@/components/Box';
import {IconButton} from '@/components/IconButton';
import {Text} from '@/components/Text';
import {Theme} from '@/lib/theme';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GithubIcon} from '@hugeicons/react-native';
import {useTheme} from '@shopify/restyle';
import {forwardRef, useCallback, useImperativeHandle, useRef} from 'react';
import {Linking} from 'react-native';
import {version} from '../../../../../package.json';

export type InformationSheetMethods = {
  showModal: () => void;
};

export const InformationSheet = forwardRef<InformationSheetMethods>(
  ({}, ref) => {
    const theme = useTheme<Theme>();
    const sheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(
      ref,
      () => ({
        showModal() {
          sheetRef.current?.expand();
        },
      }),
      [],
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        backdropComponent={renderBackdrop}
        ref={sheetRef}
        backgroundStyle={{
          backgroundColor: theme.colors.sheetBackground,
        }}
        snapPoints={[220]}
        index={-1}
        enablePanDownToClose>
        <BottomSheetView>
          <Box px="m">
            <Box flexDirection="row" alignItems="center" gap="s">
              <Text variant="header">ChatAPI</Text>
              <IconButton
                icon={GithubIcon}
                onPress={() =>
                  Linking.openURL('https://github.com/jaycho1214/chatapi-app')
                }
              />
            </Box>
            <Text color="placeholder">
              This app is an open source project. Please check the repository
              for more information.
            </Text>
            <Text color="placeholder" mt="m">
              Version: {version}
            </Text>
          </Box>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
