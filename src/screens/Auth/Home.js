import React from 'react';
import { View, Image } from 'react-native';
import { theme } from 'ui';
import BooklubTitle from 'components/BooklubTitle';
import { Button } from 'ui/button';
import SafeAreaView from 'react-native-safe-area-view';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: theme.spacing(),
          flex: 1,
        }}
      >
        <View style={{ justifyContent: 'center', flex: 5 }}>
          <BooklubTitle size={65} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button primary onPress={() => navigation.navigate('Login')}>
            Sign in
          </Button>
          <Button onPress={() => navigation.navigate('Register')}>
            Sign up
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
