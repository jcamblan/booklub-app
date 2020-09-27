import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const BooklubStack = createStackNavigator();

const BooklubNavigator = () => {
  return (
    <BooklubStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <BooklubStack.Screen name="Test" component={Test} />
    </BooklubStack.Navigator>
  );
};

export default BooklubNavigator;
