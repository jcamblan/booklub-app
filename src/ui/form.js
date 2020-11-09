import React from 'react';
import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';
import { Text, theme } from 'ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';

export const Input = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.input.backgroundColor,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          color: theme.input.textColor,
          alignItems: 'center',
          height: '100%',
          paddingLeft: 5,
          fontWeight: '500',
        }}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export const Error = styled(Text)`
color: ${({ theme }) => theme.colors.error}
margin-top: ${({ theme }) => `${theme.spacing(0.5)}px`}
`;

export const SearchInput = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.input.backgroundColor,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
      }}
    >
      <MaterialCommunityIcons
        name="search"
        color={theme.input.textColor}
        size={26}
        style={{ opacity: 0.5 }}
      />
      <TextInput
        style={{
          flex: 1,
          color: theme.colors.text,
          alignItems: 'center',
          height: '100%',
          paddingLeft: 5,
          fontWeight: '500',
        }}
        {...props}
      />
    </View>
  );
};
