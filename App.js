import React from 'react';
import * as Sentry from 'sentry-expo';
import { ThemeProvider } from 'styled-components/native';
import GraphQLProvider from 'GraphQLProvider';
import { theme } from 'ui';
import AuthProvider from 'AuthProvider';
import AppProvider from 'AppProvider';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'hooks';
import AuthNavigator from 'navigation/AuthNavigator';
import BottomTabNavigator from 'navigation/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from 'locales/en.json';
import fr from 'locales/fr.json';

i18n.translations = {
  'en-EN': en,
  fr: fr,
};
i18n.locale = Localization.locale;
i18n.fallbacks = true;

Sentry.init({
  dsn:
    'https://104457c6a0324ca98ffeb1781f267865@o466908.ingest.sentry.io/5481638',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

const Root = () => {
  const { accessToken } = useAuth();

  return (
    <NavigationContainer theme={theme}>
      {Boolean(accessToken) ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GraphQLProvider>
          <AppProvider>
            <SafeAreaProvider>
              <Root />
            </SafeAreaProvider>
          </AppProvider>
        </GraphQLProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
