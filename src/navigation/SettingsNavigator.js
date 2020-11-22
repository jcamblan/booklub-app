import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from 'screens/Setting/Settings';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleContainerStyle: { display: 'none' },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
