import React from 'react';
import { View, Text } from 'react-native';
import { theme, TextLink } from 'ui';

const InvitationCodeChunk = ({ invitationCode }) => (
  <View style={{ alignItems: 'center' }}>
    <View style={{ width: '80%' }}>
      <View>
        <Text
          style={{
            color: theme.colors.ternary,
            fontWeight: 'bold',
            fontSize: 10,
          }}
        >
          Code d'invitation
        </Text>
      </View>
      <View
        style={{
          borderRadius: 5,
          borderColor: theme.colors.ternary,
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            color: theme.colors.ternary,
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          {invitationCode}
        </Text>
      </View>
      <View flexDirection="row-reverse">
        <TextLink title="Réinitialiser" />
      </View>
    </View>
  </View>
);

export default InvitationCodeChunk;
