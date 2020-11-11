import React from 'react';
import { Text } from 'ui';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ClubHome from 'screens/ClubHome';
import CreateClub from 'screens/Club/CreateClub';
import JoinClub from 'screens/Club/JoinClub';
import ClubDetails from 'screens/Club/ClubDetails';
import SessionDetails from 'screens/Club/SessionDetails';
import CreateSession from 'screens/Club/CreateSession';
import CreateSubmission from 'screens/Club/CreateSubmission';
import { theme } from 'ui';

const BooklubStack = createStackNavigator();

const ClubsNavigator = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <BooklubStack.Screen
        name="ClubHome"
        component={ClubHome}
        options={{
          headerTitle: '',
          headerRight: () => (
            <MaterialIcons
              name="add"
              size={26}
              style={{
                color: theme.colors.primary,
                marginRight: theme.spacing(),
              }}
            />
          ),
        }}
      />
      <BooklubStack.Screen
        name="CreateClub"
        component={CreateClub}
        options={{ headerTitle: '' }}
      />
      <BooklubStack.Screen
        name="JoinClub"
        component={JoinClub}
        options={{ headerTitle: '' }}
      />
      <BooklubStack.Screen
        name="ClubDetails"
        component={ClubDetails}
        options={{ headerTitle: '' }}
      />
      <BooklubStack.Screen
        name="SessionDetails"
        component={SessionDetails}
        options={{ headerTitle: '' }}
      />
      <BooklubStack.Screen
        name="CreateSession"
        component={CreateSession}
        options={{ headerTitle: '' }}
      />
      <BooklubStack.Screen
        name="CreateSubmission"
        component={CreateSubmission}
        options={{ headerTitle: '' }}
      />
    </BooklubStack.Navigator>
  );
};

export default ClubsNavigator;
