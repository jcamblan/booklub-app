import React from 'react';
import { View } from 'react-native';
import { theme } from './theme';
import styled from 'styled-components/native';

export const Card = styled(View)`
  elevation: 19;
  border-radius: 15px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Separator = ({ spacing = theme.spacing() }) => {
  return (
    <View
      style={{
        marginVertical: spacing,
        borderBottomColor: theme.colors.onBackground,
        opacity: 0.08,
        borderBottomWidth: 1,
      }}
    />
  );
};
