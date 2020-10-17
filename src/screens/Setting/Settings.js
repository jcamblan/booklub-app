import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { H1, TextLink } from 'ui';
import { useAuth } from 'hooks';

const Settings = () => {
  const { onReset } = useAuth();

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <H1>Paramètres</H1>
        <TextLink onPress={() => onReset()} title="Se déconnecter" />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
