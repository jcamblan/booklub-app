import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { H2, theme, Separator, TextLink } from 'ui';
import SessionCard from 'components/Club/SessionCard';
import { useNavigation } from '@react-navigation/native';

const CurrentSession = ({ session }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('SessionDetails', {
            sessionId: session.id,
            title: session.name,
          })
        }
        style={{
          backgroundColor: theme.colors.highlight.background,
          color: theme.colors.highlight.text,
          marginHorizontal: 0,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <H2
            style={{
              marginBottom: 10,
              paddingTop: 0,
              color: theme.colors.highlight.text,
            }}
          >
            Session active
          </H2>
        </View>

        <SessionCard session={session} current />
      </TouchableOpacity>
      <Separator />
    </>
  );
};

export default CurrentSession;
