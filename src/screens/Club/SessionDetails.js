import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SESSION_FULL_DETAILS } from 'api/queries';
import { View } from 'react-native';
import {
  Text,
  TextLink,
  ScreenTitle,
  Headline,
  Title,
  Card,
  theme,
  Table,
  Row,
  Cell,
  Separator,
} from 'ui';
import { formatDate } from 'utils';
import SessionNoteForm from 'components/Club/SessionNoteForm';
import RefreshingScrollView from 'components/RefreshingScrollView';

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
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle>{session?.name}</ScreenTitle>
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
          <ScreenTitle style={{ textAlign: 'center' }}>
            {session?.selectedBook?.title}
          </ScreenTitle>
          <Headline style={{ textAlign: 'center', fontStyle: 'italic' }}>
            {session?.selectedBook?.author}
          </Headline>

          <Separator />
        </View>
      )}

      {session?.canNote?.value && (
        <SessionNoteForm session={session} userNote={session?.userNote} />
      )}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
          <Card>
            <Title>{session?.submissions?.totalCount}</Title>
            <Text>Participants</Text>
          </Card>
        </View>
        <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
          <Card>
            <Title>{states[session?.state]}</Title>
            <Text>Statut</Text>
          </Card>
        </View>
        <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
          <Card>
            <Title>{formatDate(session?.submissionDueDate, 'dd/MM/yy')}</Title>
            <Text>Fin des inscriptions</Text>
          </Card>
        </View>
        <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
          <Card>
            <Title>{formatDate(session?.readDueDate, 'dd/MM/yy')}</Title>
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
              <Title style={{ color: theme.colors.lightText }}>
                {averageClubNote}
              </Title>
              <Text style={{ color: theme.colors.lightText }}>
                Note moy. (club)
              </Text>
            </Card>
          </View>
        )}
        {Boolean(session?.selectedBook?.averageNote) && (
          <View style={{ width: '50%', padding: theme.spacing(0.2) }}>
            <Card>
              <Title>{session?.selectedBook?.averageNote}</Title>
              <Text>Note moy. (global)</Text>
            </Card>
          </View>
        )}
      </View>
      <Separator />

      {notes.length > 0 && (
        <>
          <Headline>Notes :</Headline>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {notes.map(({ id, value, user }) => (
              <View
                key={id}
                style={{ width: '33%', padding: theme.spacing(0.2) }}
              >
                <Card style={{ alignItems: 'center' }}>
                  <Title>{value}</Title>
                  <Text>{user?.username}</Text>
                </Card>
              </View>
            ))}
          </View>
          <Separator />
        </>
      )}

      <Headline>Propositions :</Headline>
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
    </RefreshingScrollView>
  );
};

export default SessionDetails;
