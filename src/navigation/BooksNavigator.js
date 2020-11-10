import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from 'screens/Book/BookList';

const Stack = createStackNavigator();

const BooksNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="BookList"
        component={BookList}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default BooksNavigator;
