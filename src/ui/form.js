import React from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { Text, theme } from 'ui';

export const Input = ({ style, ...props }) => {
  const { label } = props;
  return (
    <TextInput
      mode="outlined"
      autoCapitalize="none"
      label={label}
      style={{ ...style }}
      theme={theme}
      {...props}
    />
  );
};

export const Error = styled(Text)`
color: ${({ theme }) => theme.colors.error}
margin-top: ${({ theme }) => theme.spacing(0.5)}
`;
