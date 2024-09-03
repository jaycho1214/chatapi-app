import {createTheme} from '@shopify/restyle';

const baseTheme = {
  colors: {},
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      color: 'placeholder',
    },
    defaults: {
      color: 'text',
      // We can define a default text variant here.
    },
  },
};

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

export const lightTheme = createTheme({
  ...baseTheme,
  colors: {
    background: '#FFF',
    cardBackground: palette.white,
    sheetBackground: palette.white,
    text: '#000',
    error: '#FF0000',
    placeholder: '#C0C0C0',
    border: '#C0C0C0',
    buttonBackground: palette.black,
    buttonText: palette.white,
    disabled: '#CCCCCC',
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  colors: {
    background: '#000',
    cardBackground: '#181818',
    sheetBackground: '#181818',
    text: '#FFF',
    error: '#FF0000',
    placeholder: '#808080',
    border: '#303030',
    buttonBackground: '#FFF',
    buttonText: '#000',
    disabled: '#909090',
  },
});

export type Theme = typeof lightTheme;
export default lightTheme;
