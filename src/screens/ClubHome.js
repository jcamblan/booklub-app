import React from 'react';
import { useQuery } from '@apollo/client';
import { CLUBS_COUNT } from 'api/queries';
import Feed from 'screens/Club/Feed';
import EmptyHome from 'screens/Club/EmptyHome';
import { ActivityIndicator } from 'react-native';

const ClubHome = ({ navigation }) => {
  const { data, loading, refetch } = useQuery(CLUBS_COUNT);
  const clubCount = data?.myClubs?.edges?.length;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (clubCount > 0) {
    return <Feed />;
  }

  return <EmptyHome onRefetch={refetch} />;
};

export default ClubHome;
