import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClubHome from 'screens/ClubHome';
import CreateClub from 'screens/Club/CreateClub';
import JoinClub from 'screens/Club/JoinClub';
import ClubDetails from 'screens/Club/ClubDetails';
import SessionDetails from 'screens/Club/SessionDetails';
import CreateSubmission from 'screens/Club/CreateSubmission';

const BooklubStack = createStackNavigator();

const ClubsNavigator = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BooklubStack.Screen
        name="ClubHome"
        component={ClubHome}
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
      <BooklubStack.Screen
        name="SessionDetails"
        component={SessionDetails}
        options={{ headerTitle: 'Session' }}
      />
      <BooklubStack.Screen
        name="CreateSubmission"
        component={CreateSubmission}
        options={{ headerTitle: 'Participer à la session' }}
      />
    </BooklubStack.Navigator>
  );
};

export default ClubsNavigator;
