import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text, TextLink } from 'ui';

const SessionDetails = ({ route, navigation }) => {
  const sessionId = route?.params?.sessionId;

  return (
    <SafeAreaView>
      <Text>Coucou</Text>
      <Text>{sessionId}</Text>
      <TextLink
        title="Participer"
        onPress={() =>
          navigation.navigate('CreateSubmission', { sessionId: sessionId })
        }
      />
    </SafeAreaView>
  );
};

export default SessionDetails;
