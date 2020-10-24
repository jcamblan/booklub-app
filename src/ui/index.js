import React from 'react';
import {
  TouchableOpacity,
  Text as RnText,
  Button as RnButton,
  View,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { Appearance } from 'react-native';

export const base = 16;
export const spacing = (input = 1) => `${input * base}px`;

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#343434',
    title: 'black',
    primary: '#D23669',
    secondary: '#F0F0F0',
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
  shadowBox: {
    elevation: 19,
    borderRadius: 15,
    padding: 10,
  },
  spacing,
  material,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
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
  shadowBox: {
    elevation: 19,
    borderRadius: 15,
    padding: 10,
  },
  spacing,
  material,
};

const colorScheme = Appearance.getColorScheme();

export const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

export const Text = styled(RnText)`
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TextLink = ({
  title,
  textStyle = { color: theme.colors.textLink },
  ...props
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...props}
    style={{ paddingVertical: 8 }}
  >
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

export const Button = ({ title, onPress, dark = false }) => {
  const colors = {
    background: dark ? theme.colors.background : theme.colors.text,
    text: dark ? theme.colors.text : theme.colors.background,
  };

  return (
    <TouchableOpacity
      style={{
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: theme.colors.text,
        backgroundColor: colors.background,
        margin: 3,
      }}
      onPress={onPress}
    >
      <Text
        style={{ textAlign: 'center', fontWeight: '500', color: colors.text }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const H1 = ({ children, ...props }) => (
  <RnText
    style={{
      ...theme.material.display1,
      fontWeight: 'bold',
      color: theme.colors.title,
      ...props.style,
      paddingVertical: 3,
    }}
  >
    {children}
  </RnText>
);

export const H2 = ({ children, ...props }) => (
  <H1
    style={{
      ...theme.material.headline,
      ...props.style,
      fontWeight: 'bold',
    }}
  >
    {children}
  </H1>
);

export const H3 = ({ children, ...props }) => (
  <H1
    style={{
      ...theme.material.title,
      ...props.style,
      fontWeight: 'bold',
    }}
  >
    {children}
  </H1>
);

export const ShadowBox = ({ children }) => (
  <View style={{ ...theme.shadowBox, backgroundColor: theme.colors.secondary }}>
    {children}
  </View>
);

export const Separator = () => <View style={{ marginVertical: 20 }} />;
