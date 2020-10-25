import React from 'react';
import {
  TouchableOpacity,
  Text as RnText,
  View,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { Appearance } from 'react-native';
import { omit } from 'lodash';

export const base = 16;
export const spacing = (input = 1) => input * base;

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#343434',
    lightText: 'white',
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

export const H1 = styled(RnText)`
  ${({ theme }) => omit(theme.material.display1, ['lineHeight', 'fontWeight'])};
  line-height: ${({ theme }) => `${theme.material.display1.lineHeight}px`};
  font-weight: bold;
  padding-vertical: 3px;
  color: ${({ theme }) => theme.colors.title};
`;

export const H2 = styled(RnText)`
  ${({ theme }) => omit(theme.material.headline, ['lineHeight', 'fontWeight'])};
  line-height: ${({ theme }) => `${theme.material.headline.lineHeight}px`};
  font-weight: bold;
  padding-vertical: 3px;
  color: ${({ theme }) => theme.colors.title};
`;

export const H3 = styled(RnText)`
  ${({ theme }) => omit(theme.material.title, ['lineHeight', 'fontWeight'])};
  line-height: ${({ theme }) => `${theme.material.title.lineHeight}px`};
  font-weight: bold;
  padding-vertical: 3px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Card = styled(View)`
  elevation: 19;
  border-radius: 15px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Separator = () => <View style={{ marginVertical: 20 }} />;

export const Table = styled(View)`
  flex-flow: column nowrap;
  flex: 1 1 auto;
`;

export const Row = styled(View)`
  width: 100%;
  flex-flow: row nowrap;
  margin-bottom: 4px;
`;

const StyledCell = styled(View)`
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px;
  overflow: hidden;
  min-width: 0px;
  border-radius: 5px;
  margin-horizontal: 1px;
  align-items: center;
`;

export const Cell = ({ children, variant, flexGrow, justifyContent }) => {
  const color = () => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'success':
        return 'white';
      case 'warning':
        return 'white';
      default:
        return theme.colors.text;
    }
  };

  const backgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.secondary;
    }
  };

  return (
    <StyledCell
      style={{
        backgroundColor: backgroundColor(),
        flexGrow: flexGrow || 1,
        justifyContent: justifyContent || 'center',
      }}
    >
      <Text
        style={{
          color: color(),
        }}
      >
        {children}
      </Text>
    </StyledCell>
  );
};
