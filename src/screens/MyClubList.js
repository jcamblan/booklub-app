import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Title, Button } from 'ui';
import ClubList from 'components/ClubList';

const MY_CLUBS = gql`
  query myClubs {
    myClubs {
      nodes {
        name
        id
      }
    }
  }
`;

const MyClubList = ({ navigation }) => {
  const { data } = useQuery(MY_CLUBS);
  const clubs = data?.myClubs?.nodes;

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Title>Mes clubs</Title>
        <ClubList clubs={clubs} />
        <Button
          title="Créer un nouveau club"
          onPress={() => navigation.navigate('CreateClub')}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyClubList;
