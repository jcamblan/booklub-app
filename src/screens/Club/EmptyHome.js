import React from 'react';
import { View, Image } from 'react-native';
import { ScreenTitle, theme, Text } from 'ui';
import { Button } from 'ui/button';
import { useNavigation } from '@react-navigation/native';
import RefreshingScrollView from 'components/RefreshingScrollView';
import ReadingTime from 'images/ReadingTime';

const EmptyHome = ({ onRefetch }) => {
  const navigation = useNavigation();

  const onRefresh = async () => {
    await onRefetch();
  };

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <View>
        <ReadingTime width={theme.screenWidth - theme.spacing(2)} />
        <ScreenTitle
          style={{ textAlign: 'center', paddingTop: theme.spacing(2) }}
        >
          Hey Julien!
        </ScreenTitle>
        <View style={{ paddingBottom: theme.spacing() }}>
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
