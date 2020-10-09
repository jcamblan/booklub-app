import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text as RnText,
  Button as RnButton,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { DefaultTheme } from 'react-native-paper';

const { height } = Dimensions.get('window');
export const base = 16;
export const spacing = (input = 1) => `${input * base}px`;

export const theme = {
  ...DefaultTheme,
  spacing,
  material,
  colors: {
    ...DefaultTheme.colors,
    light: {
      primary: '#343434',
      secondary: '#F0F0F0',
      ternary: '#BFBFBF',
      success: '#92C84F',
      warning: '#E6973F',
      important: '#D23669',
      textLink: '#48A0E1',
    },
  },
};

export const Text = styled(RnText)`
  ${({ theme }) => theme.material.body1};
  color: ${({ theme }) => theme.colors.primary};
`;

export const TextLink = ({ title, ...props }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...props}
    style={{ paddingVertical: 8 }}
  >
    <TextLinkText>{title}</TextLinkText>
  </TouchableOpacity>
);

export const Button = ({ title, onPress, dark = false }) => {
  const colors = {
    background: dark ? theme.colors.light.primary : 'white',
    text: dark ? 'white' : theme.colors.light.primary,
  };

  return (
    <TouchableOpacity
      style={{
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: theme.colors.light.primary,
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

const TextLinkText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled(Text)`
  ${material.display1};

  color: ${({ theme }) => theme.colors.light.primary};
  font-size: 25;
  padding-top: 3;
  padding-bottom: 3;
  font-weight: bold;
`;

export const ShadowBox = ({ children }) => (
  <View
    style={{
      shadowColor: '#BFBFBF',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.35,

      elevation: 19,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 10,
    }}
  >
    {children}
  </View>
);
