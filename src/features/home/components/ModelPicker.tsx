import {Box} from '@/components/Box';
import {Divider} from '@/components/Divider';
import {Text} from '@/components/Text';
import {CompanyCard} from '@/features/home/components/CompanyCard';
import {companies, models} from '@/lib/models';
import {Theme} from '@/lib/theme';
import {useApiKey} from '@/stores/useApiKey';
import {useLLMModel} from '@/stores/useLLMModel';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@shopify/restyle';
import {forwardRef, useCallback, useImperativeHandle, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type ModelPickerMethods = {
  show: () => void;
};

export const ModelPicker = forwardRef<ModelPickerMethods, {}>(({}, ref) => {
  const theme = useTheme<Theme>();
  const sheetRef = useRef<BottomSheet>(null);
  const {top} = useSafeAreaInsets();
  const {keys} = useApiKey();
  const {setModel, modelId} = useLLMModel();

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

  useImperativeHandle(
    ref,
    () => ({
      show() {
        sheetRef.current?.snapToIndex(0);
      },
    }),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['50%', '100%']}
      index={-1}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: theme.colors.sheetBackground,
      }}
      topInset={top}
      enablePanDownToClose>
      <BottomSheetScrollView>
        <Box mx="m" mb="m">
          <Text variant="header">LLM Model</Text>
        </Box>
        <Divider />
        {companies.map(company => (
          <Box key={`Card.${company}`} mb="l">
            <Box mb="s">
              <CompanyCard company={company} />
            </Box>
            {Object.values(models)
              .filter(model => model.company === company)
              .map(model => (
                <TouchableOpacity
                  key={`Model.${model.model}`}
                  onPress={() => {
                    setModel(model.model);
                    sheetRef.current?.close();
                  }}
                  disabled={keys[model.company] == null}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: theme.spacing.m,
                    paddingHorizontal: theme.spacing.m,
                    marginHorizontal: theme.spacing.m,
                    borderRadius: 10,
                    backgroundColor:
                      model.model === modelId
                        ? theme.colors.background
                        : 'transparent',
                  }}>
                  <Text
                    style={{
                      color:
                        keys[model.company] == null
                          ? theme.colors.disabled
                          : theme.colors.text,
                    }}>
                    {model.model}
                  </Text>
                </TouchableOpacity>
              ))}
          </Box>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
