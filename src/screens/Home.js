import React from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import { theme, TextLink, H1 } from 'ui';
import BooklubTitle from 'components/BooklubTitle';
import { Button } from 'ui/button';

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
          <Button
            variant="primary"
            onPress={() => navigation.navigate('Login')}
          >
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
