import { Appearance } from 'react-native';

const baseColors = {
  light: {
    primary: '#6C63FF',
    primaryVariant: '#8B84FF',
    secondary: '#F5F5F5',
    secondaryVariant: '#707070',
    ternary: '#8F8F96',
    background: '#FFFFFF',
    surface: 'red',
    error: 'red',
    onPrimary: 'white',
    onSecondary: '#343434',
    onBackground: '#343434',
    onSurface: '#343434',
    onError: 'red',
  },
  dark: {
    primary: '#6C63FF',
    primaryVariant: '#8B84FF',
    secondary: '#1E1E1E',
    secondaryVariant: '#707070',
    ternary: '#8F8F96',
    background: 'black',
    surface: 'red',
    error: 'red',
    onPrimary: 'white',
    onSecondary: 'white',
    onBackground: '#FFFFFF',
    onSurface: '#343434',
    onError: 'red',
  },
};

export const colors =
  Appearance.getColorScheme() === 'dark' ? baseColors.dark : baseColors.light;
