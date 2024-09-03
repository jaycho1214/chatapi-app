import {Box} from '@/components/Box';
import {CompanyIcon} from '@/components/CompanyIcon';
import {IconButton} from '@/components/IconButton';
import {Text} from '@/components/Text';
import {companies, companyInfo, models} from '@/lib/models';
import {Theme} from '@/lib/theme';
import {useApiKey} from '@/stores/useApiKey';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Copy01Icon} from '@hugeicons/react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTheme} from '@shopify/restyle';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';

export type ApiKeySheetMethods = {
  showModal: (company: (typeof companies)[number]) => void;
};

export const ApiKeySheet = forwardRef<ApiKeySheetMethods>(({}, ref) => {
  const theme = useTheme<Theme>();
  const sheetRef = useRef<BottomSheet>(null);
  const [company, setCompany] = useState<(typeof companies)[number]>(
    companies[0],
  );
  const [tempKey, setTempKey] = useState('');
  const inputRef = useRef<TextInput>(null);
  const {setKey} = useApiKey();

  useImperativeHandle(
    ref,
    () => ({
      showModal(company) {
        setCompany(company);
        setTempKey('');
        sheetRef.current?.expand();
        inputRef.current?.focus();
      },
    }),
    [],
  );

  const onDone = useCallback(() => {
    if (tempKey.trim().length > 0) {
      setKey(company, tempKey);
    } else {
      setKey(company, undefined);
    }
    sheetRef.current?.close();
  }, [company, tempKey, setKey]);

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

  const onAnimate = useCallback((from: number, to: number) => {
    if (to === -1) {
      inputRef.current?.blur();
      setTempKey('');
    }
  }, []);

  const onPaste = useCallback(async () => {
    try {
      const text = await Clipboard.getString();
      setTempKey(text);
    } catch (err) {}
  }, []);

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      snapPoints={[220]}
      index={-1}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: theme.colors.sheetBackground,
      }}
      onAnimate={onAnimate}>
      <BottomSheetView>
        <Box px="m" py="xs" flexDirection="row" alignItems="center">
          <CompanyIcon company={company} size={20} />
          <Text ml="s" fontWeight="bold" fontSize={20}>
            {companyInfo[company].name}
          </Text>
        </Box>
        <Text ml="m" fontSize={12}>
          {Object.values(models)
            .filter(({company: c}) => c === company)
            .map(({name}) => name)
            .join(', ')}
        </Text>
        <Box
          borderWidth={1}
          borderColor="border"
          flexDirection="row"
          alignItems="center"
          mx="m"
          mt="s"
          borderRadius={10}
          backgroundColor="cardBackground">
          <BottomSheetTextInput
            ref={inputRef as any}
            placeholder="API Key..."
            style={{
              flex: 1,
              paddingVertical: theme.spacing.m,
              paddingHorizontal: theme.spacing.s,
              color: theme.colors.text,
            }}
            secureTextEntry
            value={tempKey}
            onChangeText={setTempKey}
          />
          <IconButton
            icon={Copy01Icon}
            onPress={onPaste}
            style={{
              paddingVertical: theme.spacing.m,
              paddingHorizontal: theme.spacing.s,
            }}
          />
        </Box>
        <Text px="m" fontSize={12} mt="xs" color="placeholder">
          API Keys are stored in secure storage, and never leave your device.
        </Text>
        <TouchableOpacity onPress={onDone} style={{alignSelf: 'flex-end'}}>
          <Box
            mr="m"
            mt="m"
            px="m"
            py="s"
            borderRadius={10}
            backgroundColor="buttonBackground">
            <Text color="buttonText" fontWeight="bold">
              Done
            </Text>
          </Box>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
});
