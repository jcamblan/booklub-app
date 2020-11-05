import React from 'react';
import { View } from 'react-native';
import { theme, H1 } from 'ui';

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
