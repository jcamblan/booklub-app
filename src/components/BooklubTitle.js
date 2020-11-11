import React from 'react';
import { View } from 'react-native';
import { theme, ScreenTitle } from 'ui';

const BooklubTitle = ({ size = 40 }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ScreenTitle style={{ fontSize: size, lineHeight: size * 1.25 }}>
        BOO
        <ScreenTitle style={{ fontSize: size, color: theme.colors.primary }}>
          K
        </ScreenTitle>
        LÜB
      </ScreenTitle>
    </View>
  );
};

export default BooklubTitle;
