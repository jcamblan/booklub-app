import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/Auth/Home';
import Login from 'screens/Auth/Login';
import Register from 'screens/Auth/Register';
import { theme } from 'ui';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <AuthStack.Screen
        options={{
          headerTitle: 'toto',
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowColor: 'transparent',
          },
        }}
        name="Home"
        component={Home}
      />
      <AuthStack.Screen
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowColor: 'transparent',
          },
        }}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowColor: 'transparent',
          },
        }}
        name="Register"
        component={Register}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
