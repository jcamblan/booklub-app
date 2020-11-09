import React from 'react';
import { View } from 'react-native';
import { Text } from 'ui';

const ClubCard = ({ club }) => {
  return (
    <View>
      <Text>{club.name}</Text>
    </View>
  );
};

export default ClubCard;
