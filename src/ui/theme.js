import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { Appearance } from 'react-native';
import { material } from 'react-native-typography';
import { Dimensions } from 'react-native';
export const base = 16;
export const spacing = (input = 1) => input * base;

const primaryColor = '#6C63FF';
const secondaryColor = '#F5F5F5';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#343434',
    lightText: 'white',
    title: 'black',
    primary: primaryColor,
    secondary: secondaryColor,
    ternary: '#707070',
    background: 'white',
    success: '#92C84F',
    warning: '#E6973F',
    textLink: '#48A0E1',
    bottomBar: { background: '#F0F0F0', active: '#222222' },
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
  button: {
    primary: {
      backgroundColor: primaryColor,
      textColor: '#FFFFFF',
      borderRadius: 16,
      paddingHorizontal: 40,
      paddingVertical: 16,
      marginBottom: 10,
    },
    secondary: {
      backgroundColor: secondaryColor,
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
  spacing,
  material,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
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

const colorScheme = Appearance.getColorScheme();

export const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
