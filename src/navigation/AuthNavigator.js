import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/Home';
import { Button } from 'ui';
import Login from 'screens/Auth/Login';
const AuthStack = createStackNavigator();

// const Login = () => {
//   return (
//     <SafeAreaView>
//       <View>
//         <Text style={{ color: '#000000' }}>Hello</Text>
//         <Text style={{ color: '#000000' }}>Hello</Text>
//         <Text style={{ color: '#000000' }}>Hello</Text>
//         <Text style={{ color: '#000000' }}>Hello</Text>
//         <Button title="test" />
//         <Text style={{ color: '#000000' }}>Hello</Text>
//         <Text style={{ color: '#000000' }}>Hello</Text>
//         <Text style={{ color: '#000000' }}>Hello</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

const Register = () => {
  return (
    <SafeAreaView>
      <Text>Coucou</Text>
    </SafeAreaView>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
