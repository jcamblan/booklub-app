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
    success: 'green',
    warning: 'green',
    textLink: colors.primary,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.onPrimary,
      borderRadius: 16,
      paddingHorizontal: 40,
      paddingVertical: 16,
      marginBottom: 10,
    },
    secondary: {
      backgroundColor: colors.secondary,
      textColor: colors.onSecondary,
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
  bottomSheet: {
    backgroundColor: colors.background,
  },
  spacing,
  material,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};

const darkTheme = {
  colors: {
    ...colors,
    dark: true,
    mode: 'adaptive',
    text: colors.onBackground,
    lightText: colors.onPrimary,
    title: colors.onBackground,
    success: '#92C84F',
    warning: '#E6973F',
    textLink: colors.primary,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.onPrimary,
      borderRadius: 16,
      paddingHorizontal: 40,
      paddingVertical: 16,
      marginBottom: 10,
    },
    secondary: {
      backgroundColor: '#323236',
      textColor: colors.onSecondary,
      borderRadius: 16,
      paddingHorizontal: 40,
      paddingVertical: 16,
      marginBottom: 10,
    },
  },
  input: {
    backgroundColor: '#1C1C1E',
    textColor: 'white',
  },
  icon: {
    star: {
      filledBackgroundColor: '',
      emptyBackgroundColor: '',
    },
  },
  card: {
    elevation: 19,
    borderRadius: 15,
    padding: 10,
  },
  bottomSheet: {
    backgroundColor: '#1E1E1E',
  },
  spacing,
  material,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};

export const theme =
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
