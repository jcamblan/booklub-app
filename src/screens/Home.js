import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { theme, TextLink } from 'ui';
import BooklubTitle from 'components/BooklubTitle';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          height: theme.screenHeight,
        }}
      >
        <BooklubTitle size={65} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 150,
          }}
        >
          <TextLink
            title="S'inscrire"
            onPress={() => navigation.navigate('Register')}
          />
          <TextLink
            title="Se connecter"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
