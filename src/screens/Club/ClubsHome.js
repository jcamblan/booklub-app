import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { theme, Headline, Text, Button } from 'ui';
import { MY_CLUBS } from 'api/queries';
import ClubCard from 'components/Club/ClubCard';
import RefreshingScrollView from 'components/RefreshingScrollView';
import { useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';
import ScreenTitle from 'components/ScreenTitle';

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
        <ScreenTitle
          iconElement={
            <FontAwesome
              name="plus"
              size={20}
              color={theme.colors.onSecondary}
              style={{ opacity: 0.8 }}
            />
          }
          onPress={onOpen}
        >
          My clubs
        </ScreenTitle>

        <Carousel
          keyExtractor={item => item?.id}
          data={clubs}
          renderItem={({ item, index, separators }) => (
            <View key={item.id} style={{ marginRight: theme.spacing(0.5) }}>
              <ClubCard club={item} />
            </View>
          )}
          itemWidth={theme.screenWidth - theme.spacing(2.5)}
          sliderWidth={theme.screenWidth}
          slideStyle={{}}
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
          modalStyle={{
            padding: theme.spacing(),
            backgroundColor: theme.bottomSheet.backgroundColor,
          }}
          modalHeight={170}
        >
          <Button
            primary
            onPress={() => {
              modalizeRef.current?.close();
              navigation.navigate('JoinClub');
            }}
          >
            Join a club
          </Button>
          <Button
            onPress={() => {
              modalizeRef.current?.close();
              navigation.navigate('CreateClub');
            }}
          >
            Create a club
          </Button>
        </Modalize>
      </Portal>
    </>
  );
};

export default ClubsHome;
