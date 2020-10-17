import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import GraphQLProvider from 'GraphQLProvider';
import { theme } from 'ui';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthProvider from 'AuthProvider';
import Home from 'screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth, useApp } from 'hooks';
import AuthNavigator from 'navigation/AuthNavigator';
import BottomTabNavigator from 'navigation/BottomTabNavigator';
import { List, ListItem } from 'components/List';
import { Button } from 'ui';

const Logged = () => {
  const { onReset } = useAuth();
  return (
    <SafeAreaView>
      <Button onPress={onReset} title="Se déconnecter" />
    </SafeAreaView>
  );
};

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
      <PaperProvider theme={theme}>
        <AuthProvider>
          <GraphQLProvider>
            <Root />
          </GraphQLProvider>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
