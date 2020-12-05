import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { theme, ScreenTitle as TextScreenTitle } from 'ui';

const ScreenTitle = ({ children, iconElement, onPress }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextScreenTitle>{children}</TextScreenTitle>
      <TouchableOpacity
        style={{
          marginBottom: theme.spacing(),
          flex: 1,
          alignItems: 'flex-end',
        }}
        onPress={onPress}
      >
        {Boolean(iconElement) && (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: theme.colors.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 1,
              paddingTop: 2,
            }}
          >
            {iconElement}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ScreenTitle;
