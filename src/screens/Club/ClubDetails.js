import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/client';
import { H2, theme, Text, Separator, TextLink } from 'ui';
import LastSessions from 'components/Club/LastSessions';
import MemberList from 'components/Club/MemberList';
import InvitationCodeChunk from 'components/Club/InvitationCodeChunk';
import CurrentSession from 'components/Club/CurrentSession';
import { CLUB_FULL_DETAILS } from 'api/queries';

const ClubDetails = ({ route, navigation }) => {
  const { data, loading, refetch } = useQuery(CLUB_FULL_DETAILS, {
    variables: { id: route.params.clubId },
  });
  const node = data?.node;
  const sessions = (node?.sessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            <H2>Membres</H2>
            <MemberList userEdges={node?.users?.edges} />
            <Separator />
          </>
        )}

        {sessions.length > 0 && (
          <>
            <H2 style={{ marginBottom: 10 }}>Derniers livres</H2>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClubDetails;
