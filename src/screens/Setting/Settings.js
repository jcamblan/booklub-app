import React from 'react';
import { View } from 'react-native';
import { Button, ScreenTitle, theme } from 'ui';
import { useAuth } from 'hooks';
import SafeAreaView from 'react-native-safe-area-view';

const Settings = () => {
  const { onReset } = useAuth();

  return (
    <SafeAreaView style={{ paddingHorizontal: theme.spacing() }}>
      <ScreenTitle>Settings</ScreenTitle>
      <Button onPress={() => onReset()}>Se déconnecter</Button>
    </SafeAreaView>
  );
};

export default Settings;
