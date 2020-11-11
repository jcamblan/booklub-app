import React from 'react';
import { useQuery } from '@apollo/client';
import { CLUBS } from 'api/queries';
import ActiveHome from 'screens/Club/ActiveHome';
import EmptyHome from 'screens/Club/EmptyHome';
import { ActivityIndicator } from 'react-native';

const ClubHome = ({ navigation }) => {
  const { data, loading, refetch } = useQuery(CLUBS);
  const clubs = (data?.myClubs?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  if (loading) {
    return <ActivityIndicator />;
  }

  if (clubs.length > 0) {
    return <ActiveHome clubs={clubs} onRefetch={refetch} />;
  }

  return <EmptyHome onRefetch={refetch} />;
};

export default ClubHome;
