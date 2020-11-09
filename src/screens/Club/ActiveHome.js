import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  H1,
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
import ClubCard from 'components/Club/ClubCard';

const CurrentSessionTable = ({ sessions }) => {
  const navigation = useNavigation();
  const states = {
    submission: 'Inscript.',
    draw: 'Tirage',
    reading: 'Lecture',
    conclusion: 'Vote',
    archived: 'Archivé',
  };
  return (
    <Table style={{ paddingTop: theme.spacing() }}>
      {sessions.map(session => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ClubDetails', {
              clubId: club.id,
              title: club.name,
            })
          }
          key={session.id}
        >
          <Row>
            <Cell flexGrow={3} justifyContent="flex-start">
              {[session.club?.name, session?.name].filter(Boolean).join(' - ')}
            </Cell>
            <Cell flexGrow={1} variant="success">
              {states[session.state]}
            </Cell>
          </Row>
        </TouchableOpacity>
      ))}
    </Table>
  );
};

const ClubTable = ({ clubs }) => {
  const navigation = useNavigation();
  return (
    <View>
      {clubs.map(club => (
        <ClubCard club={club} />
      ))}
    </View>
  );
};

const ActiveHome = ({ navigation, clubs }) => {
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
            <CurrentSessionTable sessions={currentSessions} />
            <Separator />
          </>
        )}

        <H1>Mes clubs</H1>
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

export default ActiveHome;
