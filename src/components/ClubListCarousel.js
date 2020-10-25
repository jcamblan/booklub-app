import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Text, theme, H1, H3, Separator, Card } from 'ui';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from 'utils';

const screenWidth = Dimensions.get('window').width;

const ClubCarouselCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ClubDetails', {
          clubId: item.id,
          title: item.name,
        })
      }
    >
      <Card>
        <H3>{item?.name}</H3>
        <Text>{item?.users?.totalCount} membres</Text>
        {item?.sessions?.nodes?.length > 0 && (
          <Text>
            Dernière session :{' '}
            {formatDate(item?.sessions?.nodes[0]?.readDueDate, 'dd/MM/yyyy')}
          </Text>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const ClubListCarousel = ({ clubs }) => {
  return (
    <View style={{ marginLeft: -20, width: screenWidth }}>
      <Carousel
        keyExtractor={(item) => item?.id}
        data={clubs}
        renderItem={({ item }) => <ClubCarouselCard item={item} />}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 50}
        slideStyle={{ justifyContent: 'center' }}
      />
    </View>
  );
};

export default ClubListCarousel;
