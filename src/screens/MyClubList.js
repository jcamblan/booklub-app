import React from 'react';
import { View, SafeAreaView, Text, ScrollView, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Title, Button } from 'ui';
import ClubList from 'components/ClubList';
import { FAB } from 'react-native-paper';

const MY_CLUBS = gql`
  query myClubs($after: String, $before: String, $first: Int, $last: Int) {
    myClubs(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          name
          id
        }
      }

      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const MyClubList = ({ navigation }) => {
  const clubsPerPage = 6;
  const { data, fetchMore } = useQuery(MY_CLUBS, {
    variables: { first: clubsPerPage },
  });
  const clubs = (data?.myClubs?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const handleNextPage = () => {
    fetchMore({
      variables: {
        after: data?.myClubs?.pageInfo.endCursor,
        first: clubsPerPage,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.myClubs.edges;
        const pageInfo = fetchMoreResult.myClubs.pageInfo;

        return newEdges.length
          ? {
              myClubs: {
                __typename: previousResult.myClubs.__typename,
                edges: [...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  const handlePreviousPage = () => {
    fetchMore({
      variables: {
        before: data?.myClubs?.pageInfo.startCursor,
        last: clubsPerPage,
        first: null,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.myClubs.edges;
        const pageInfo = fetchMoreResult.myClubs.pageInfo;

        return newEdges.length
          ? {
              myClubs: {
                __typename: previousResult.myClubs.__typename,
                edges: [...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  return (
    <View style={{ paddingTop: 70 }}>
      <FAB
        style={styles.fab}
        small
        animated
        icon="plus"
        onPress={() => navigation.navigate('CreateClub')}
      />
      <FAB
        style={styles.fab2}
        small
        animated
        icon="account-arrow-left-outline"
        onPress={() => navigation.navigate('JoinClub')}
      />
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <Title>Mes clubs</Title>
        <ClubList clubs={clubs} />
        {(data?.myClubs?.pageInfo?.hasNextPage ||
          data?.myClubs?.pageInfo?.hasPreviousPage) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: 30,
            }}
          >
            {data?.myClubs?.pageInfo?.hasPreviousPage && (
              <Button onPress={handlePreviousPage} title="Page précédente" />
            )}
            {data?.myClubs?.pageInfo?.hasNextPage && (
              <Button onPress={handleNextPage} title="Page suivante" />
            )}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 5,
    backgroundColor: 'black',
    color: 'white',
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 50,
    top: 5,
    backgroundColor: 'white',
    color: 'black',
  },
});

export default MyClubList;
