import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MyClubList from 'screens/MyClubList';
import CreateClub from 'screens/Club/CreateClub';
import JoinClub from 'screens/Club/JoinClub';
import ClubDetails from 'screens/Club/ClubDetails';
import { theme } from 'ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BooklubStack = createStackNavigator();

const KlubStack = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BooklubStack.Screen
        name="MyClubList"
        component={MyClubList}
        options={{ headerTitle: 'Mes clubs' }}
      />
      <BooklubStack.Screen
        name="CreateClub"
        component={CreateClub}
        options={{ headerTitle: 'Créer un club' }}
      />
      <BooklubStack.Screen
        name="JoinClub"
        component={JoinClub}
        options={{ headerTitle: 'Rejoindre un club' }}
      />
      <BooklubStack.Screen
        name="ClubDetails"
        component={ClubDetails}
        options={{ headerTitle: 'Détails du club' }}
      />
    </BooklubStack.Navigator>
  );
};

const Test = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BooklubStack.Screen
        name="CreateClub"
        component={CreateClub}
        options={{ headerTitle: 'Créer un club' }}
      />
    </BooklubStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const BooklubNavigator = () => {
  return (
    <Tab.Navigator
      activeColor={theme.colors.bottomBar.active}
      barStyle={{ backgroundColor: theme.colors.bottomBar.background }}
    >
      <Tab.Screen
        name="Clubs"
        component={KlubStack}
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
        component={Test}
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
        name="Profile"
        component={Test}
        options={{
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Test}
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

export default BooklubNavigator;
