import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native';
import image from 'images/reading_time.png';
import { H1, theme } from 'ui';
import { Button } from 'ui/button';
import { useNavigation } from '@react-navigation/native';

const EmptyHome = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ padding: theme.spacing() }}>
      <View style={{ justifyContent: 'flex-start' }}>
        <Image
          source={image}
          style={{
            width: theme.screenWidth,
            height: theme.screenWidth * 0.687444345503117,
            resizeMode: 'contain',
          }}
        />
        <H1 style={{ textAlign: 'center' }}>Hey Julien!</H1>
        <View style={{ padding: theme.spacing() }}>
          <Text style={{ textAlign: 'center' }}>
            Create or join your first book club
          </Text>
          <Text style={{ textAlign: 'center' }}> and start reading!</Text>
        </View>
        <Button
          onPress={() => navigation.navigate('JoinClub')}
          variant="primary"
        >
          Join a club
        </Button>
        <Button onPress={() => navigation.navigate('CreateClub')}>
          Create a club
        </Button>
      </View>
    </ScrollView>
  );
};

export default EmptyHome;
