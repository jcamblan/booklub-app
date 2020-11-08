import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SESSION_FULL_DETAILS } from 'api/queries';
import { View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import {
  Text,
  TextLink,
  H1,
  H2,
  H3,
  Card,
  theme,
  Table,
  Row,
  Cell,
  Separator,
} from 'ui';
import { formatDate } from 'utils';
import SessionNoteForm from 'components/Club/SessionNoteForm';

const states = {
  submission: 'Inscription',
  draw: 'Tirage',
  reading: 'Lecture',
  conclusion: 'Vote',
  archived: 'Archivé',
};

const SessionDetails = ({ route, navigation }) => {
  const sessionId = route?.params?.sessionId;
  const { data, loading, refetch } = useQuery(SESSION_FULL_DETAILS, {
    variables: { id: sessionId },
  });
  const session = data?.node;
  const submissions = (session?.submissions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const notes = (session?.notes?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const averageClubNote =
    (session?.notes?.edges ?? [])
      .map(({ node: { value } }) => value)
      .reduce((sum, note) => sum + note, 0) / session?.notes?.edges?.length;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {session?.canParticipate?.value && (
          <TextLink
            title="Participer"
            onPress={() =>
              navigation.navigate('CreateSubmission', { sessionId: sessionId })
            }
          />
        )}

        {Boolean(session?.selectedBook) && (
          <View style={{ paddingHorizontal: -20 }}>
            <H1 style={{ textAlign: 'center' }}>
              {session?.selectedBook?.title}
            </H1>
            <H2 style={{ textAlign: 'center', fontStyle: 'italic' }}>
              {session?.selectedBook?.author}
            </H2>

            <Separator />
          </View>
        )}

        {session?.canNote?.value && (
          <SessionNoteForm session={session} userNote={session?.userNote} />
        )}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
            <Card>
              <H3>{session?.submissions?.totalCount}</H3>
              <Text>Participants</Text>
            </Card>
          </View>
          <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
            <Card>
              <H3>{states[session?.state]}</H3>
              <Text>Statut</Text>
            </Card>
          </View>
          <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
            <Card>
              <H3>{formatDate(session?.submissionDueDate, 'dd/MM/yy')}</H3>
              <Text>Fin des inscriptions</Text>
            </Card>
          </View>
          <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
            <Card>
              <H3>{formatDate(session?.readDueDate, 'dd/MM/yy')}</H3>
              <Text>Date limite de lecture</Text>
            </Card>
          </View>
          {Boolean(averageClubNote) && (
            <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
              <Card
                style={{
                  backgroundColor: theme.colors.ternary,
                }}
              >
                <H3 style={{ color: theme.colors.lightText }}>
                  {averageClubNote}
                </H3>
                <Text style={{ color: theme.colors.lightText }}>
                  Note moy. (club)
                </Text>
              </Card>
            </View>
          )}
          {Boolean(session?.selectedBook?.averageNote) && (
            <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
              <Card>
                <H3>{session?.selectedBook?.averageNote}</H3>
                <Text>Note moy. (global)</Text>
              </Card>
            </View>
          )}
        </View>
        <Separator />

        {notes.length > 0 && (
          <>
            <H2>Notes :</H2>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {notes.map(({ id, value, user }) => (
                <View
                  key={id}
                  style={{ width: '33%', padding: theme.spacing(0.2) }}
                >
                  <Card style={{ alignItems: 'center' }}>
                    <H3>{value}</H3>
                    <Text>{user?.username}</Text>
                  </Card>
                </View>
              ))}
            </View>
            <Separator />
          </>
        )}

        <H2>Propositions :</H2>
        {submissions.length > 0 ? (
          <Table>
            {submissions.map(({ id, book, user }) => (
              <Row key={id}>
                <Cell justifyContent="flex-start" flexGrow={3}>
                  {book.title}, {book.author}
                </Cell>
                <Cell variant="primary">{user.username}</Cell>
              </Row>
            ))}
          </Table>
        ) : (
          <Text>Aucun-e inscrit-e pour le moment.</Text>
        )}
        <Separator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SessionDetails;
