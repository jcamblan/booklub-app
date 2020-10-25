import React from 'react';
import { View, Image, Platform, Dimensions } from 'react-native';
import book from 'images/book.png';
import styled from 'styled-components/native';
import { material } from 'react-native-typography';
import { theme, Text, H1, H2 } from 'ui';

const BooklubTitle = ({ size = 40 }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <H1 style={{ fontSize: size, lineHeight: size * 1.25 }}>
        BOO
        <H1 style={{ fontSize: size, color: theme.colors.primary }}>K</H1>
        LÜB
      </H1>
    </View>
  );
};

export default BooklubTitle;
