import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { List } from 'react-native-paper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Title, theme, ShadowBox } from 'ui';
import LogoName from 'components/LogoName';
import Carousel from 'react-native-snap-carousel';
import { formatDistanceDate, formatDate } from 'utils';

const screenWidth = Dimensions.get('window').width;

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
            }
          }
        }
      }
    }
  }
`;

const Separator = () => <View style={{ marginVertical: 20 }} />;

const SessionChunk = ({ item }) => {
  return (
    <View
      style={{
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: 'black',
        backgroundColor: 'white',
        marginBottom: 10,
      }}
    >
      <Text>{item.name}</Text>
    </View>
  );
};

const SessionList = ({ sessions }) => {
  return (
    <View>
      {sessions.map((session) => (
        <SessionChunk item={session} />
      ))}
    </View>
  );
};

const ClubName = ({ name }) => (
  <View style={{ flexDirection: 'row' }}>
    <LogoName hideLogo />
    <Text style={{ fontSize: 30, fontWeight: 'bold' }}> - {name}</Text>
  </View>
);

const StatePill = ({ pillState, sessionState }) => {
  const states = {
    submission: 'Inscript.',
    draw: 'Tirage',
    reading: 'Lecture',
    conclusion: 'Vote',
    archived: 'Archivé',
  };

  const backgroundColor =
    pillState == sessionState
      ? theme.colors.light.success
      : theme.colors.light.secondary;

  const color =
    pillState == sessionState ? 'white' : theme.colors.light.ternary;

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        padding: 5,
        width: '24%',
        borderRadius: 5,
      }}
    >
      <Text style={{ color: color, textAlign: 'center' }}>
        {states[pillState]}
      </Text>
    </View>
  );
};

const StateBar = ({ state }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      }}
    >
      <StatePill sessionState={state} pillState="submission" />
      <StatePill sessionState={state} pillState="draw" />
      <StatePill sessionState={state} pillState="reading" />
      <StatePill sessionState={state} pillState="conclusion" />
    </View>
  );
};

const SessionCard = ({ session, current = false }) => {
  const book = session?.selectedBook;
  const submitters = session?.selectedBookSubmitters?.nodes;
  const readDueDate = formatDate(session?.readDueDate, 'dd/MM/yyyy');
  const submissionDueDate = formatDistanceDate(session?.submissionDueDate);

  return (
    <View style={{ width: '100%' }}>
      {current && <StateBar state={session.state} />}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexShrink: 2 }}>
          {Boolean(book) && session?.state !== 'submission' && (
            <>
              <Text style={{ fontSize: 20 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  }}
                >
                  {book?.title}
                </Text>
                ,
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                <Text
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  {book?.author}
                </Text>
              </Text>

              <Text>
                Proposé par :{' '}
                {submitters?.map((user) => user.username).join(', ')}
              </Text>
            </>
          )}

          {(session?.state === 'submission' || session?.state === 'draw') && (
            <Text>{session?.submissions?.totalCount} livres proposés</Text>
          )}

          <Text>{session?.submissions?.totalCount} inscrits</Text>

          {session.state === 'submission' && (
            <Text>Tirage au sort : {submissionDueDate}</Text>
          )}
          <Text>Fin de la session le : {readDueDate}</Text>
        </View>

        {!current && (
          <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
            <View
              style={{
                backgroundColor: theme.colors.light.success,
                width: 45,
                paddingVertical: 6,
                borderRadius: 10,
              }}
            >
              <View>
                <Text
                  style={{ textAlign: 'center', color: 'white', fontSize: 20 }}
                >
                  5
                </Text>
              </View>
              <View alignItems="center">
                <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    width: '50%',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{ textAlign: 'center', color: 'white', fontSize: 20 }}
                >
                  10
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const LastSessions = ({ sessions }) => (
  <View
    style={{
      marginLeft: -20,
      width: screenWidth,
    }}
  >
    <Carousel
      keyExtractor={({ node }) => node?.id}
      data={sessions}
      renderItem={({ item, index, separators }) => {
        const width = screenWidth - 40;
        return (
          <View
            style={{
              width: width,
              marginHorizontal: 20,
              marginBottom: 25,
              justifyContent: 'center',
            }}
            key={item?.id}
          >
            <ShadowBox>
              <SessionCard session={item} />
            </ShadowBox>
          </View>
        );
      }}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
    />
  </View>
);

const MemberList = ({ userEdges }) => {
  console.log(userEdges);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}
      >
        <View
          style={{
            flexGrow: 2,
            marginRight: 2,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Nom
          </Text>
        </View>
        <View
          style={{
            width: 50,
            marginRight: 2,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Sessions
          </Text>
        </View>
        <View
          style={{
            width: 50,
            marginRight: 2,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Tirages
          </Text>
        </View>
        <View
          style={{
            width: 50,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Bonus
          </Text>
        </View>
      </View>
      {userEdges.map(({ node, sessionCount, selectionCount, bonusScore }) => (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}
          key={node?.id}
        >
          <View
            style={{
              backgroundColor: theme.colors.light.secondary,
              flexGrow: 2,
              marginRight: 2,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text>{node?.username}</Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.light.warning,
              width: 50,
              marginRight: 2,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {sessionCount}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.light.success,
              width: 50,
              marginRight: 2,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {selectionCount}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.light.primary,
              width: 50,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {bonusScore}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const InvitationCodeChunk = ({ invitationCode }) => (
  <View style={{ alignItems: 'center', marginBottom: 40 }}>
    <View style={{ width: '80%' }}>
      <View>
        <Text
          style={{
            color: theme.colors.light.ternary,
            fontWeight: 'bold',
            fontSize: 10,
          }}
        >
          Code d'invitation
        </Text>
      </View>
      <View
        style={{
          borderRadius: 5,
          borderColor: theme.colors.light.ternary,
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            color: theme.colors.light.ternary,
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          {invitationCode}
        </Text>
      </View>
      <View>
        <Text style={{ textAlign: 'right' }}>Réinitialiser</Text>
      </View>
    </View>
  </View>
);

const ClubDetails = ({ route }) => {
  const { data } = useQuery(CLUB, { variables: { id: route.params.id } });
  const node = data?.node;
  const sessions = (node?.sessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <ClubName name={node?.name} />
        <Separator />

        {Boolean(node?.currentSession) && (
          <>
            <Title style={{ marginBottom: 10 }}>Session active</Title>
            <SessionCard session={node?.currentSession} current />
            <Separator />
          </>
        )}

        {Boolean(sessions) && (
          <>
            <Title style={{ marginBottom: 10 }}>Dernières sessions</Title>
            <LastSessions sessions={sessions} />
            <Separator />
          </>
        )}

        {Boolean(node?.users?.edges) && (
          <>
            <Title style={{ marginBottom: 10 }}>Membres</Title>
            <MemberList userEdges={node?.users?.edges} />
            <Separator />
          </>
        )}

        <InvitationCodeChunk invitationCode={node?.invitationCode} />

        {/* <View>
          <Text
            style={{
              textAlign: 'center',
              color: theme.colors.light.warning,
              marginBottom: 50,
            }}
          >
            Club géré par{' '}
            <Text style={{ fontWeight: '500' }}>{node?.manager?.username}</Text>
          </Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClubDetails;
