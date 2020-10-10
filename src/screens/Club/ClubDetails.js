import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Title, theme, Text, Separator } from 'ui';
import LogoName from 'components/LogoName';
import LastSessions from 'components/Club/LastSessions';
import MemberList from 'components/Club/MemberList';
import InvitationCodeChunk from 'components/Club/InvitationCodeChunk';
import CurrentSession from 'components/Club/CurrentSession';

const CLUB = gql`
  query club($id: ID!) {
    node(id: $id) {
      ... on Club {
        id
        name
        invitationCode
        users {
          edges {
            node {
              id
              username
            }
            sessionCount
            selectionCount
            bonusScore
          }
        }
        currentSession {
          id
          name
          state
          readDueDate
          submissionDueDate
          submissions {
            edges {
              node {
                book {
                  author
                  title
                }
              }
            }
            totalCount
          }
          selectedBook {
            id
            title
            author
          }
          selectedBookSubmitters {
            nodes {
              id
              username
            }
          }
        }
        manager {
          id
          username
        }
        sessions {
          edges {
            node {
              id
              name
              state
              selectedBook {
                id
                title
                author
              }
              selectedBookSubmitters {
                nodes {
                  id
                  username
                }
              }
              readDueDate
              submissionDueDate
              submissions {
                edges {
                  node {
                    book {
                      author
                      title
                    }
                  }
                }
                totalCount
              }
              notes {
                nodes {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ClubName = ({ name }) => (
  <View style={{ flexDirection: 'row' }}>
    <LogoName hideLogo />
    <Title style={{ fontSize: 30, fontWeight: 'bold' }}> - {name}</Title>
  </View>
);

const ClubDetails = ({ route }) => {
  const { data, loading } = useQuery(CLUB, {
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
            <Title style={{ marginBottom: 10 }}>Membres</Title>
            <MemberList userEdges={node?.users?.edges} />
            <Separator />
          </>
        )}

        {sessions.length > 0 && (
          <>
            <Title style={{ marginBottom: 10 }}>Derniers livres</Title>
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
