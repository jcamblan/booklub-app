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
import { t } from 'i18n-js';

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
        options={{ title: t('screens.ClubHome.title') }}
      />
      <BooklubStack.Screen
        name="CreateClub"
        component={CreateClub}
        options={{ headerTitle: t('screens.CreateClub.title') }}
      />
      <BooklubStack.Screen
        name="JoinClub"
        component={JoinClub}
        options={{ headerTitle: t('screens.JoinClub.title') }}
      />
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
      <BooklubStack.Screen
        name="CreateSession"
        component={CreateSession}
        options={{ headerTitle: t('screens.CreateSession.title') }}
      />
      <BooklubStack.Screen
        name="CreateSubmission"
        component={CreateSubmission}
        options={{ headerTitle: t('screens.CreateSubmission.title') }}
      />
      <BooklubStack.Screen
        name="ReviewBook"
        component={ReviewBook}
        options={{ headerTitle: t('screens.ReviewBook.title') }}
      />
    </BooklubStack.Navigator>
  );
};

export default ClubsNavigator;
