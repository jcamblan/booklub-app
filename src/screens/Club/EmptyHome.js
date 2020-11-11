import React from 'react';
import { View, Image, Text } from 'react-native';
import image from 'images/reading_time.png';
import { ScreenTitle, theme } from 'ui';
import { Button } from 'ui/button';
import { useNavigation } from '@react-navigation/native';
import RefreshingScrollView from 'components/RefreshingScrollView';

const EmptyHome = ({ onRefetch }) => {
  const navigation = useNavigation();

  const onRefresh = async () => {
    await onRefetch();
  };

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <View>
        <Image
          source={image}
          style={{
            width: theme.screenWidth,
            height: theme.screenWidth * 0.687444345503117,
            resizeMode: 'contain',
          }}
        />
        <ScreenTitle style={{ textAlign: 'center' }}>Hey Julien!</ScreenTitle>
        <View style={{ padding: theme.spacing() }}>
          <Text style={{ textAlign: 'center' }}>
            Create or join your first book club
          </Text>
          <Text style={{ textAlign: 'center' }}> and start reading!</Text>
        </View>
        <Button onPress={() => navigation.navigate('JoinClub')} primary>
          Join a club
        </Button>
        <Button onPress={() => navigation.navigate('CreateClub')}>
          Create a club
        </Button>
      </View>
    </RefreshingScrollView>
  );
};

export default EmptyHome;
