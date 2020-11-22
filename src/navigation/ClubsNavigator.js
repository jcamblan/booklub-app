import React from 'react';
import { Text } from 'ui';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from 'screens/Club/Home';
import CreateClub from 'screens/Club/CreateClub';
import JoinClub from 'screens/Club/JoinClub';
import Club from 'screens/Club/Club';
import Session from 'screens/Club/Session';
import ReviewBook from 'screens/Club/ReviewBook';
import CreateSession from 'screens/Club/CreateSession';
import CreateSubmission from 'screens/Club/CreateSubmission';
import { theme } from 'ui';

const BooklubStack = createStackNavigator();

const ClubsNavigator = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleContainerStyle: { display: 'none' },
      }}
    >
      <BooklubStack.Screen
        name="ClubHome"
        component={Home}
        options={{ title: 'Home' }}
      />
      <BooklubStack.Screen name="CreateClub" component={CreateClub} />
      <BooklubStack.Screen name="JoinClub" component={JoinClub} />
      <BooklubStack.Screen
        name="Club"
        component={Club}
        options={({ route }) => ({ title: route.params.title })}
      />
      <BooklubStack.Screen
        name="Session"
        component={Session}
        options={({ route }) => ({ title: route.params.title })}
      />
      <BooklubStack.Screen name="CreateSession" component={CreateSession} />
      <BooklubStack.Screen
        name="CreateSubmission"
        component={CreateSubmission}
      />
      <BooklubStack.Screen name="ReviewBook" component={ReviewBook} />
    </BooklubStack.Navigator>
  );
};

export default ClubsNavigator;
