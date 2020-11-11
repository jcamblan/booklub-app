import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { Headline, theme, Text, Separator, TextLink, ScreenTitle } from 'ui';
import LastSessions from 'components/Club/LastSessions';
import MemberList from 'components/Club/MemberList';
import InvitationCodeChunk from 'components/Club/InvitationCodeChunk';
import CurrentSession from 'components/Club/CurrentSession';
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
      {Boolean(node?.currentSession) && (
        <CurrentSession session={node?.currentSession} />
      )}

      {node?.canCreateSession?.value && (
        <View style={{ alignItems: 'center' }}>
          <TextLink
            title="Lancer une nouvelle session de lecture !"
            onPress={() =>
              navigation.navigate('CreateSession', { clubId: node?.id })
            }
          />
        </View>
      )}

      {Boolean(node?.users?.edges) && (
        <>
          <Headline>Membres</Headline>
          <MemberList userEdges={node?.users?.edges} />
          <Separator />
        </>
      )}

      {sessions.length > 0 && (
        <>
          <Headline style={{ marginBottom: 10 }}>Derniers livres</Headline>
          <LastSessions sessions={sessions} />
          <Separator />
        </>
      )}

      {Boolean(node?.invitationCode) && (
        <>
          <InvitationCodeChunk invitationCode={node?.invitationCode} />
          <Separator />
        </>
      )}

      <View>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.warning,
            marginBottom: 50,
          }}
        >
          Club géré par{' '}
          <Text style={{ fontWeight: '500', color: theme.colors.warning }}>
            {node?.manager?.username}
          </Text>
        </Text>
      </View>
    </RefreshingScrollView>
  );
};

export default ClubDetails;
