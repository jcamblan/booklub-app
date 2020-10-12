import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ShadowBox } from 'ui';
import SessionCard from 'components/Club/SessionCard';

const screenWidth = Dimensions.get('window').width;

const LastSessions = ({ sessions }) => (
  <View style={{ marginLeft: -20, width: screenWidth }}>
    <Carousel
      keyExtractor={(item) => item?.id}
      data={sessions}
      renderItem={({ item, index, separators }) => (
        <ShadowBox>
          <SessionCard session={item} />
        </ShadowBox>
      )}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 50}
      slideStyle={{ justifyContent: 'center' }}
    />
  </View>
);

export default LastSessions;
