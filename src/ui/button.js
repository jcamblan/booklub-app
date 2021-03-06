import React from 'react';
import { Text } from './typography';
import { theme } from './theme';
import { TouchableOpacity } from 'react-native';

export const Button = ({ children, primary = false, onPress }) => {
  const style = primary ? theme.button.primary : theme.button.secondary;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: style.textColor,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
