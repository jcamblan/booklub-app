import React from 'react';
import { ScreenTitle, theme, Headline, Text } from 'ui';
import { MY_CLUBS } from 'api/queries';
import ClubCard from 'components/Club/ClubCard';
import RefreshingScrollView from 'components/RefreshingScrollView';
import { useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';

const ClubsHome = () => {
  const { data, loading, refetch } = useQuery(MY_CLUBS);
  const clubs = (data?.myClubs?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle>My clubs</ScreenTitle>

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
  );
};

export default ClubsHome;
