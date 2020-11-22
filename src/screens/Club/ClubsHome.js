import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenTitle, theme, Headline, Text, Button } from 'ui';
import { MY_CLUBS } from 'api/queries';
import ClubCard from 'components/Club/ClubCard';
import RefreshingScrollView from 'components/RefreshingScrollView';
import { useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';

const ClubsHome = () => {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(MY_CLUBS);
  const clubs = (data?.myClubs?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const modalizeRef = useRef(null);

  const onRefresh = async () => {
    await refetch();
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <RefreshingScrollView onRefresh={onRefresh}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ScreenTitle>My clubs</ScreenTitle>
          <TouchableOpacity
            style={{
              marginBottom: theme.spacing(),
              flex: 1,
              alignItems: 'flex-end',
            }}
            onPress={onOpen}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: theme.colors.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome name="plus" size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <Carousel
          keyExtractor={item => item?.id}
          data={clubs}
          renderItem={({ item, index, separators }) => (
            <ClubCard key={item.id} club={item} />
          )}
          itemWidth={theme.screenWidth - theme.spacing(2.5)}
          sliderWidth={theme.screenWidth}
          slideStyle={{ marginRight: theme.spacing(0.5) }}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          activeSlideAlignment={'start'}
          contentContainerCustomStyle={{ marginBottom: theme.spacing() }}
        />

        <Headline style={{ marginBottom: theme.spacing() }}>
          Popular clubs
        </Headline>
        <Text>TODO</Text>
      </RefreshingScrollView>

      <Portal>
        <Modalize
          ref={modalizeRef}
          modalStyle={{ padding: theme.spacing() }}
          modalHeight={150}
        >
          <Button primary onPress={() => navigation.navigate('JoinClub')}>
            Join a club
          </Button>
          <Button onPress={() => navigation.navigate('CreateClub')}>
            Create a club
          </Button>
        </Modalize>
      </Portal>
    </>
  );
};

export default ClubsHome;
