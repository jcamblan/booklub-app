import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyClubList from 'screens/MyClubList';
import CreateClub from 'screens/Club/CreateClub';

const BooklubStack = createStackNavigator();

const BooklubNavigator = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <BooklubStack.Screen name="MyClubList" component={MyClubList} />
      <BooklubStack.Screen name="CreateClub" component={CreateClub} />
    </BooklubStack.Navigator>
  );
};

export default BooklubNavigator;
