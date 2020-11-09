import React from 'react';
import styled from 'styled-components/native';
import { Text, theme } from 'ui';
import { TouchableOpacity } from 'react-native';

export const Button = ({ children, variant, onPress }) => {
  const style =
    variant === 'primary' ? theme.button.primary : theme.button.secondary;
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
