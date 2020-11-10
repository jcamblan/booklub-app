import React from 'react';
import {
  TouchableOpacity,
  Text as RnText,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import theme from './theme';

export const Card = styled(View)`
  elevation: 19;
  border-radius: 15px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Separator = () => <View style={{ marginVertical: 20 }} />;
