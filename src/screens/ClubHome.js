import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { H1, Button, theme, Text, Separator, TextLink } from 'ui';
import ClubList from 'components/ClubList';
import ClubListCarousel from 'components/ClubListCarousel';
import { CLUBS } from 'api/queries';

const CurrentSessionItem = ({ session }) => {
  const states = {
    submission: 'Inscript.',
    draw: 'Tirage',
    reading: 'Lecture',
    conclusion: 'Vote',
    archived: 'Archivé',
  };
  return (
    <View style={{ marginBottom: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}
        key={session.id}
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
    </View>
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

const ClubHome = ({ navigation }) => {
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
            <H1>Session{currentSessions.length > 1 && `s`} en cours</H1>
            <CurrentSessionList sessions={currentSessions} />
            <Separator />
          </>
        )}

        <H1>Mes clubs</H1>
        <ClubListCarousel clubs={clubs} />
        <Separator />

        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
          <TextLink
            title="Rejoindre un club"
            onPress={() => navigation.navigate('JoinClub')}
          />
          <TextLink
            title="Créer un club"
            onPress={() => navigation.navigate('CreateClub')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ClubHome;
