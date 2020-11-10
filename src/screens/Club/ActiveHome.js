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
import { Button } from 'ui/button';

const ClubList = ({ clubs }) => {
  const navigation = useNavigation();

  return (
    <View>
      {clubs.map(club => (
        <ClubCard key={club.id} club={club} />
      ))}
    </View>
  );
};

const ActiveHome = ({ clubs }) => {
  const navigation = useNavigation();

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
        <H1 style={{ marginBottom: theme.spacing() }}>Mes clubs</H1>
        <ClubList clubs={clubs} />

        {/* TODO: this must go into modal */}
        <View
          style={{
            paddingTop: theme.spacing(2),
            marginBottom: theme.spacing(15),
          }}
        >
          <Button
            onPress={() => navigation.navigate('JoinClub')}
            variant="primary"
          >
            Join a club
          </Button>
          <Button onPress={() => navigation.navigate('CreateClub')}>
            Create a club
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveHome;
