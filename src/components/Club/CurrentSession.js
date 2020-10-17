import React from 'react';
import { View } from 'react-native';
import { H2, theme, Separator, TextLink, Text } from 'ui';
import SessionCard from 'components/Club/SessionCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CurrentSession = ({ session }) => {
  const navigation = useNavigation();

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <H2 style={{ marginBottom: 10, color: theme.colors.highlight.text }}>
            Session active
          </H2>
          <TextLink
            title={'+ Voir le détail'}
            textStyle={{ color: 'white', fontWeight: '600' }}
            onPress={() =>
              navigation.navigate('SessionDetails', { sessionId: session.id })
            }
          />
        </View>

        <SessionCard session={session} current />
      </View>
      <Separator />
    </>
  );
};

export default CurrentSession;
