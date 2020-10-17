import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  Text,
  Dimensions,
} from 'react-native';
import book from 'images/book.png';
import { H1, Button } from 'ui';
import LogoName from 'components/LogoName';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: windowHeight,
        }}
      >
        <LogoName size={windowWidth / 2} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title="S'inscrire"
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            title="Se connecter"
            onPress={() => navigation.navigate('Login')}
            dark
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
