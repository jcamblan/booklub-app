import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card, TextLink } from 'ui';
import SessionCard from 'components/Club/SessionCard';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const LastSessions = ({ sessions }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: -20, width: screenWidth }}>
      <Carousel
        keyExtractor={item => item?.id}
        data={sessions}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SessionDetails', {
                sessionId: item.id,
                title: item.name,
              })
            }
          >
            <Card>
              <SessionCard
                style={{ paddingTop: 10, paddingHorizontal: 10 }}
                session={item}
              />
              {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TextLink
                title="+ Voir le détail"
                onPress={() =>
                  navigation.navigate('SessionDetails', {
                    sessionId: item.id,
                    title: item.name,
                  })
                }
              />
            </View> */}
            </Card>
          </TouchableOpacity>
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 64}
        slideStyle={{ justifyContent: 'center' }}
      />
    </View>
  );
};

export default LastSessions;