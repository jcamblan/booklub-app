import { Appearance } from 'react-native';

const baseColors = {
  light: {
    primary: '#6C63FF',
    primaryVariant: '#8B84FF',
    secondary: '#F5F5F5',
    secondaryVariant: '#707070',
    background: '#FFFFFF',
    surface: 'red',
    error: 'red',
    onPrimary: 'white',
    onSecondary: 'red',
    onBackground: '#343434',
    onSurface: '#343434',
    onError: 'red',
    text: 'red',
  },
  dark: {
    primary: '#6C63FF',
    primaryVariant: '',
    secondary: '#F5F5F5',
    secondaryVariant: '#707070',
    background: '#FFFFFF',
    surface: 'red',
    error: 'red',
    onPrimary: 'red',
    onSecondary: 'red',
    onBackground: '#343434',
    onSurface: '#343434',
    onError: 'red',
    text: 'red',
  },
};

export const colors =
  Appearance.getColorScheme() === 'dark' ? baseColors.dark : baseColors.light;
