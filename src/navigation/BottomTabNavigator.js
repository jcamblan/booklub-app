import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Settings from 'screens/Setting/Settings';
import ClubsNavigator from 'navigation/ClubsNavigator';
import BooksNavigator from 'navigation/BooksNavigator';
import SettingsNavigator from 'navigation/SettingsNavigator';
import { theme } from 'ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor={theme.colors.bottomBar.active}
      barStyle={{ backgroundColor: theme.colors.bottomBar.background }}
    >
      <Tab.Screen
        name="Clubs"
        component={ClubsNavigator}
        options={{
          tabBarLabel: 'Clubs',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Books"
        component={BooksNavigator}
        options={{
          tabBarLabel: 'Livres',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
