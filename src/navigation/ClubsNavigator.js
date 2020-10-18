import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClubHome from 'screens/ClubHome';
import CreateClub from 'screens/Club/CreateClub';
import JoinClub from 'screens/Club/JoinClub';
import ClubDetails from 'screens/Club/ClubDetails';
import SessionDetails from 'screens/Club/SessionDetails';
import CreateSession from 'screens/Club/CreateSession';
import CreateSubmission from 'screens/Club/CreateSubmission';
import LogoName from 'components/LogoName';

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
        options={{ headerTitle: (props) => <LogoName hideLogo /> }}
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
        options={({ route }) => ({ title: route.params.title || 'Club' })}
      />
      <BooklubStack.Screen
        name="SessionDetails"
        component={SessionDetails}
        options={({ route }) => ({ title: route.params.title || 'Session' })}
      />
      <BooklubStack.Screen
        name="CreateSession"
        component={CreateSession}
        options={{ headerTitle: 'Lancer une session' }}
      />
      <BooklubStack.Screen
        name="CreateSubmission"
        component={CreateSubmission}
        options={{ headerTitle: 'Participer' }}
      />
    </BooklubStack.Navigator>
  );
};

export default ClubsNavigator;
