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
      renderItem={({ item, index, separators }) => {
        const width = screenWidth - 40;
        return (
          <View
            style={{
              width: width,
              marginHorizontal: 20,
              marginBottom: 25,
              justifyContent: 'center',
            }}
          >
            <ShadowBox>
              <SessionCard session={item} />
            </ShadowBox>
          </View>
        );
      }}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
    />
  </View>
);

export default LastSessions;
