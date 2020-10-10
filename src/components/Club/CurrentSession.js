import React from 'react';
import { View } from 'react-native';
import { Title, theme, Separator } from 'ui';
import SessionCard from 'components/Club/SessionCard';

const CurrentSession = ({ session }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.highlight.background,
          color: theme.colors.highlight.text,
          marginHorizontal: -20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 40,
        }}
      >
        <Title style={{ marginBottom: 10, color: theme.colors.highlight.text }}>
          Session active
        </Title>
        <SessionCard session={session} current />
      </View>
      <Separator />
    </>
  );
};

export default CurrentSession;
