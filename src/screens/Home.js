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
import { Title, Button } from 'ui';

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
        <Image
          source={book}
          style={{
            width: windowWidth / 2,
            height: windowWidth / 2,
            resizeMode: 'contain',
          }}
        />
        <Title>BOOKLUB</Title>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title="S'inscrire"
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            title="Se connecter"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
