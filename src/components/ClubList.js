import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ClubCard = ({ club }) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderColor: 'black',
          backgroundColor: 'white',
          marginBottom: 10,
        }}
      >
        <Text
          onPress={() => navigation.navigate('ClubDetails', { id: club.id })}
        >
          {club.name}
        </Text>
        <Text>3 membres</Text>
        <Text>Dernière session : 27/04/2020</Text>
      </View>
    </>
  );
};
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
