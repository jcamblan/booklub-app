import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/Home';
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
          headerTitle: '',
          headerStyle: { backgroundColor: theme.colors.background },
        }}
        name="Home"
        component={Home}
      />
      <AuthStack.Screen
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: theme.colors.background },
        }}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: theme.colors.background },
        }}
        name="Register"
        component={Register}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
