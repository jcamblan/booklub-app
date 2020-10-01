import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text as RnText,
  Button as RnButton,
} from 'react-native';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { DefaultTheme } from 'react-native-paper';

const { height } = Dimensions.get('window');
export const base = 16;
export const spacing = (input = 1) => `${input * base}px`;

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primary: '#000',
  },

  spacing,

  cardBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',

  buttonBorderRadius: '22px',
  screenWithFixedButtonBottomPadding: '80px',
  material,
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

export const Button = (props) => (
  <RnButton color={theme.colors.primary} {...props} />
);

const TextLinkText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled(Text)`
  ${material.display1};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-weight: bold;

  ${({ hasBareMargin }) =>
    hasBareMargin &&
    `
    margin: 0
  `}
`;
