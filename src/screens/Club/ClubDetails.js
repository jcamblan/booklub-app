import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { H1, H2, theme, Text, Separator } from 'ui';
import LogoName from 'components/LogoName';
import LastSessions from 'components/Club/LastSessions';
import MemberList from 'components/Club/MemberList';
import InvitationCodeChunk from 'components/Club/InvitationCodeChunk';
import CurrentSession from 'components/Club/CurrentSession';
import { CLUB_FULL_DETAILS } from 'api/queries';

const ClubName = ({ name }) => (
  <View style={{ flexDirection: 'row' }}>
    <LogoName hideLogo />
    <H1 style={{ fontSize: 30, fontWeight: 'bold' }}> - {name}</H1>
  </View>
);

const ClubDetails = ({ route }) => {
  const { data, loading } = useQuery(CLUB_FULL_DETAILS, {
    variables: { id: route.params.id },
  });
  const node = data?.node;
  const sessions = (node?.sessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <ClubName name={node?.name} />
        <Separator />

        {Boolean(node?.currentSession) && (
          <CurrentSession session={node?.currentSession} />
        )}

        {Boolean(node?.users?.edges) && (
          <>
            <H2 style={{ marginBottom: 10 }}>Membres</H2>
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
