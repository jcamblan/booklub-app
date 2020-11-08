import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@apollo/client';
import {
  H2,
  theme,
  Text,
  Separator,
  TextLink,
  Table,
  Row,
  Cell,
  HeadCell,
} from 'ui';
import { CLUBS } from 'api/queries';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from 'utils';

const CurrentSessionItem = ({ session }) => {
  const navigation = useNavigation();

  const states = {
    submission: 'Inscript.',
    draw: 'Tirage',
    reading: 'Lecture',
    conclusion: 'Vote',
    archived: 'Archivé',
  };

  return (
    <TouchableOpacity
      style={{ marginBottom: 4 }}
      onPress={() =>
        navigation.navigate('SessionDetails', {
          sessionId: session?.id,
          title: session?.name,
        })
      }
    >
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
            backgroundColor: theme.colors.secondary,
            flexGrow: 2,
            marginRight: 2,
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'left',
              color: theme.colors.text,
            }}
          >
            {[session.club?.name, session?.name].filter(Boolean).join(' - ')}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.success,
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
            width: '25%',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: theme.colors.lightText,
            }}
          >
            {states[session.state]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const CurrentSessionList = ({ sessions }) => {
  return (
    <View style={{ width: '100%', paddingTop: theme.spacing() }}>
      {sessions.map(session => (
        <CurrentSessionItem key={session.id} session={session} />
      ))}
    </View>
  );
};

const ClubTable = ({ clubs }) => {
  const navigation = useNavigation();
  return (
    <Table style={{ paddingTop: theme.spacing() }}>
      {clubs.map(club => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ClubDetails', {
              clubId: club.id,
              title: club.name,
            })
          }
          key={club.id}
        >
          <Row>
            <Cell justifyContent="flex-start">{club.name}</Cell>
          </Row>
        </TouchableOpacity>
      ))}
    </Table>
  );
};

const ClubHome = ({ navigation }) => {
  const { data, loading, refetch } = useQuery(CLUBS);
  const clubs = (data?.myClubs?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const currentSessions = (clubs ?? [])
    .filter(({ currentSession }) => Boolean(currentSession?.id))
    .map(({ currentSession, name, id }) => ({
      ...currentSession,
      ...{ club: { name: name, id: id } },
    }));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{ paddingHorizontal: 20, minHeight: theme.screenHeight }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {currentSessions.length > 0 && (
          <>
            <Separator />
            <H2>Session{currentSessions.length > 1 && `s`} en cours</H2>
            <CurrentSessionList sessions={currentSessions} />
            <Separator />
          </>
        )}

        <H2>Mes clubs</H2>
        <ClubTable clubs={clubs} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClubHome;
