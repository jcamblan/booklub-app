import React from 'react';
import { View } from 'react-native';
import { Button, ScreenTitle, theme } from 'ui';
import { useAuth } from 'hooks';
import SafeAreaView from 'react-native-safe-area-view';
import { t } from 'i18n-js';

const Settings = () => {
  const { onReset } = useAuth();

  return (
    <SafeAreaView style={{ paddingHorizontal: theme.spacing() }}>
      <ScreenTitle>{t('screens.Settings.title')}</ScreenTitle>
      <Button onPress={() => onReset()}>
        {t('screens.Settings.logoutButton')}
      </Button>
    </SafeAreaView>
  );
};

export default Settings;
