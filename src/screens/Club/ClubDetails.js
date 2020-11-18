import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { Headline, theme, Text, Separator, TextLink, ScreenTitle } from 'ui';
import { CLUB_FULL_DETAILS } from 'api/queries';
import RefreshingScrollView from 'components/RefreshingScrollView';

const ClubDetails = ({ route, navigation }) => {
  const { data, loading, refetch } = useQuery(CLUB_FULL_DETAILS, {
    variables: { id: route.params.clubId },
  });
  const node = data?.node;
  const sessions = (node?.sessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const onRefresh = async () => {
    await refetch();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle>{node?.name}</ScreenTitle>
    </RefreshingScrollView>
  );
};

export default ClubDetails;
