import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { TextLink } from 'ui';
import { useAuth } from 'hooks';

const Settings = () => {
  const { onReset } = useAuth();

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <TextLink onPress={() => onReset()} title="Se déconnecter" />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
