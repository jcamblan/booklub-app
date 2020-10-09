import React from 'react';
import { View, Image, Platform, Text, Dimensions } from 'react-native';
import book from 'images/book.png';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { theme } from 'ui';

const Title = styled(Text)`
  ${material.display1};
  color: ${theme.colors.light.primary};
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
      <Title style={{ display: hideTitle ? 'none' : 'flex' }}>
        BØØ
        <Text style={{ color: theme.colors.light.important }}>K</Text>
        LÜB
      </Title>
    </View>
  );
};

export default LogoName;
