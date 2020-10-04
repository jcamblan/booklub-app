import React from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Title } from 'ui';

const CLUB = gql`
  query club($id: ID!) {
    node(id: $id) {
      ... on Club {
        id
        name
        invitationCode
        users {
          nodes {
            id
            username
          }
        }
      }
    }
  }
`;

const ClubDetails = ({ route }) => {
  const { data } = useQuery(CLUB, { variables: { id: route.params.id } });
  const node = data?.node;
  console.log(node?.users?.nodes);
  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Title>Nom du groupe :</Title>
        <Text>{node?.name}</Text>
        {Boolean(node?.invitationCode) && (
          <>
            <Title>Code d'invitation :</Title>
            <Text>{node.invitationCode}</Text>
          </>
        )}
        <Title>Membres du club :</Title>
        <FlatList
          data={node?.users?.nodes}
          renderItem={({ item }) => (
            <List.Item
              title={item.username}
              left={(props) => <List.Icon {...props} icon="folder" />}
            />
          )}
          keyExtractor={(club) => club.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default ClubDetails;
