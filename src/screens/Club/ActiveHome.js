import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  ScreenTitle,
  Headline,
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
import { Button } from 'ui';
import RefreshingScrollView from 'components/RefreshingScrollView';

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

const ActiveHome = ({ clubs, onRefetch }) => {
  const navigation = useNavigation();

  const currentSessions = (clubs ?? [])
    .filter(({ currentSession }) => Boolean(currentSession?.id))
    .map(({ currentSession, name, id }) => ({
      ...currentSession,
      ...{ club: { name: name, id: id } },
    }));

  const onRefresh = async () => {
    await onRefetch();
  };

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle>Mes clubs</ScreenTitle>
      <ClubList clubs={clubs} />

      {/* TODO: this must go into modal */}
      <View
        style={{
          paddingTop: theme.spacing(2),
          marginBottom: theme.spacing(15),
        }}
      >
        <Button onPress={() => navigation.navigate('JoinClub')} primary>
          Join a club
        </Button>
        <Button onPress={() => navigation.navigate('CreateClub')}>
          Create a club
        </Button>
      </View>
    </RefreshingScrollView>
  );
};

export default ActiveHome;
