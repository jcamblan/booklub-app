import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const ClubCard = ({ club }) => (
  <List.Item
    title={club.name}
    left={(props) => <List.Icon {...props} icon="folder" />}
  />
);

const ClubList = ({ clubs }) => {
  return (
    <View>
      {Boolean(clubs) && (
        <FlatList
          data={clubs}
          renderItem={({ item }) => <ClubCard club={item} />}
          keyExtractor={(club) => club.id}
        />
      )}
    </View>
  );
};

export default ClubList;
