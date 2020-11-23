import React from 'react';
import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';
import { theme } from './theme';
import { Text } from './typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';

export const Input = ({ error, ...props }) => {
  const errorStyle = Boolean(error)
    ? { borderColor: theme.colors.error, borderStyle: 'solid', borderWidth: 1 }
    : {};

  return (
    <View style={{ paddingVertical: theme.spacing(0.5) }}>
      <TextInput
        style={{
          color: theme.input.textColor,
          alignItems: 'center',
          fontWeight: '500',
          borderBottomWidth: 1,
          borderColor: '#DEDEE0',
          paddingVertical: theme.spacing(0.5),
        }}
        autoCapitalize="none"
        {...props}
      />
      {Boolean(error) && (
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      )}
    </View>
  );
};

export const Error = styled(Text)`
color: ${({ theme }) => theme.colors.error}
margin-bottom: ${({ theme }) => `${theme.spacing(0.5)}px`}
text-align: center;
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
