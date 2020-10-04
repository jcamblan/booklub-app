import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyClubList from 'screens/MyClubList';
import CreateClub from 'screens/Club/CreateClub';
import JoinClub from 'screens/Club/JoinClub';
import ClubDetails from 'screens/Club/ClubDetails';

const BooklubStack = createStackNavigator();

const BooklubNavigator = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
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

export default BooklubNavigator;
