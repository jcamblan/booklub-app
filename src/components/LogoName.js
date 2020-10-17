import React from 'react';
import { View, Image, Platform, Dimensions } from 'react-native';
import book from 'images/book.png';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { theme, Text } from 'ui';

const H1 = styled(Text)`
  ${material.display1};
  color: ${theme.colors.text};
  font-weight: bold;
`;

const LogoName = ({
  size = 100,
  hideLogo,
  hideTitle,
  flexDirection = 'column',
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: flexDirection,
      }}
    >
      <Image
        source={book}
        style={{
          width: size,
          height: size,
          resizeMode: 'contain',
          display: hideLogo ? 'none' : 'flex',
        }}
      />
      <H1 style={{ display: hideTitle ? 'none' : 'flex' }}>
        BOO
        <H1 style={{ color: theme.colors.primary }}>K</H1>
        LÜB
      </H1>
    </View>
  );
};

export default LogoName;
