import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ClubsNavigator from 'navigation/ClubsNavigator';
import BooksNavigator from 'navigation/BooksNavigator';
import SettingsNavigator from 'navigation/SettingsNavigator';
import { theme } from 'ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Host } from 'react-native-portalize';
import { t } from 'i18n-js';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Host>
      <Tab.Navigator
        activeColor={theme.colors.primary}
        barStyle={{
          backgroundColor: theme.colors.background,
          shadowColor: 'transparent',
          padding: theme.spacing(),
        }}
      >
        <Tab.Screen
          name="Clubs"
          component={ClubsNavigator}
          options={{
            tabBarLabel: t('BottomTab.labels.Clubs'),
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
            tabBarLabel: t('BottomTab.labels.Books'),
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
            tabBarLabel: t('BottomTab.labels.Settings'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="settings" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </Host>
  );
};

export default BottomTabNavigator;
