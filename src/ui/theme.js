import { Appearance } from 'react-native';
import { material } from 'react-native-typography';
import { Dimensions } from 'react-native';
import { colors } from './colors';

export const base = 16;
export const spacing = (input = 1) => input * base;

const lightTheme = {
  colors: {
    ...colors,
    text: colors.onBackground,
    lightText: colors.onPrimary,
    title: colors.onBackground,
    ternary: colors.secondaryVariant,
    success: 'green',
    warning: 'green',
    textLink: 'green',
    highlight: {
      text: 'green',
      background: 'green',
      secondary: 'green',
      ternary: 'green',
    },
  },
  bottomBar: { background: colors.secondary, active: colors.primary },
  button: {
    primary: {
      backgroundColor: colors.primary,
      textColor: '#FFFFFF',
      borderRadius: 16,
      paddingHorizontal: 40,
      paddingVertical: 16,
      marginBottom: 10,
    },
    secondary: {
      backgroundColor: colors.secondary,
      textColor: '#000000',
      borderRadius: 16,
      paddingHorizontal: 40,
      paddingVertical: 16,
      marginBottom: 10,
    },
  },
  input: {
    backgroundColor: '#EFEFF0',
    textColor: '#3C3C43',
  },
  icon: {
    star: {
      filledBackgroundColor: '',
      emptyBackgroundColor: '',
    },
  },
  spacing,
  material,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};

const darkTheme = {
  colors: {
    dark: true,
    mode: 'adaptive',
    light: {
      primary: 'green',
      secondary: 'green',
      ternary: 'green',
      success: 'green',
      warning: 'green',
      textLink: 'green',
    },
    text: '#F0F0F0',
    lightText: 'white',
    title: 'white',
    primary: '#D23669',
    secondary: '#222222',
    ternary: '#707070',
    background: '#17181A',
    success: '#92C84F',
    warning: '#E6973F',
    textLink: '#D23669',
    bottomBar: { background: '#222222', active: 'white' },
    highlight: {
      text: 'white',
      background: '#D23669',
      secondary: '#F05286',
      ternary: '#F491B2',
    },
  },
  card: {
    elevation: 19,
    borderRadius: 15,
    padding: 10,
  },
  spacing,
  material,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};

export const theme =
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
