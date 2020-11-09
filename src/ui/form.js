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
        backgroundColor: theme.colors.secondary,
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
          color: theme.colors.text,
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

export const SearchInput = ({ onChangeText, placeholder }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.secondary,
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
        color={theme.colors.text}
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
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};
