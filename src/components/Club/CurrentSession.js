import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Headline, theme, Separator, TextLink } from 'ui';
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
          backgroundColor: theme.colors.primary,
          color: theme.colors.onPrimary,
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
          <Headline
            style={{
              marginBottom: 10,
              paddingTop: 0,
              color: theme.colors.onPrimary,
            }}
          >
            Session active
          </Headline>
        </View>

        <SessionCard session={session} current />
      </TouchableOpacity>
      <Separator />
    </>
  );
};

export default CurrentSession;
