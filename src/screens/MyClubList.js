import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Title, Button, theme, Text, Separator } from 'ui';
import ClubList from 'components/ClubList';
import ClubListCarousel from 'components/ClubListCarousel';

const CLUBS = gql`
  query myClubs {
    myClubs(last: 5) {
      edges {
        node {
          id
          name
          users {
            totalCount
          }
          sessions(last: 1) {
            nodes {
              readDueDate
            }
          }
          currentSession {
            id
            name
            state
            readDueDate
            submissionDueDate
            submissions {
              edges {
                node {
                  book {
                    author
                    title
                  }
                }
              }
              totalCount
            }
            selectedBook {
              id
              title
              author
            }
            selectedBookSubmitters {
              nodes {
                id
                username
              }
            }
          }
        }
      }
    }
  }
`;
const CurrentSessionItem = ({ session }) => {
  const states = {
    submission: 'Inscript.',
    draw: 'Tirage',
    reading: 'Lecture',
    conclusion: 'Vote',
    archived: 'Archivé',
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}
        key={id}
      >
        <View
          style={{
            backgroundColor: theme.colors.success,
            flexGrow: 2,
            marginRight: 2,
            borderRadius: 5,
            padding: 10,
            flexShrink: 2,
          }}
        >
          <Text>{session.club?.name}</Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.success,
            marginRight: 2,
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            {session?.readDueDate}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.success,
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            {states[session.state]}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
        }}
      >
        <Text>{session.selectedBook?.title}</Text>
      </View>
    </>
  );
};
const CurrentSessionList = ({ sessions }) => {
  return (
    <View style={{ width: '100%' }}>
      {sessions.map((session) => (
        <CurrentSessionItem key={session.id} session={session} />
      ))}
    </View>
  );
};

const MyClubList = ({ navigation }) => {
  const { data, loading } = useQuery(CLUBS);
  const clubs = (data?.myClubs?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const currentSessions = (clubs ?? [])
    .filter(({ currentSession }) => Boolean(currentSession?.id))
    .map(({ currentSession, name, id }) => ({
      ...currentSession,
      ...{ club: { name: name, id: id } },
    }));

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        {currentSessions.length > 0 && (
          <>
            <Title>Session{currentSessions.length > 1 && `s`} en cours</Title>
            <CurrentSessionList sessions={currentSessions} />
            <Separator />
          </>
        )}

        <Title>Mes clubs</Title>
        <ClubListCarousel clubs={clubs} />
      </View>
    </SafeAreaView>
  );
};

export default MyClubList;
