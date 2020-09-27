import React from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, Text } from 'ui';
import Icon from './Icon';

export const List = styled(View)`
  background-color: #fff;
`;

const TextItem = styled(Text)`
  font-family: Quicksand-Bold;
  ${({ theme }) => theme.material.subheading};
`;

const ListItemWrapper = styled(TouchableOpacity)`
  background-color: #fff;
  flex-direction: row;
  position: relative;
  padding-vertical: ${({ theme }) => theme.spacing(0.5)};
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing()};
  height: 56px;
`;

const ListItemIcon = styled(View)``;

const ListItemBody = styled(View)`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing()};
`;

export const ListItem = ({ icon, boxShadowColor, onPress, label, isLast }) => (
  <ListItemWrapper isLast={isLast} onPress={onPress}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemBody>
      <TextItem>{label}</TextItem>
    </ListItemBody>
    <MaterialIcons
      name="chevron-right"
      size={26}
      color={theme.colors.primary}
    />
  </ListItemWrapper>
);
