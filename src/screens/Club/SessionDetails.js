import React from 'react';
import { useQuery } from '@apollo/client';
import { SESSION_FULL_DETAILS } from 'api/queries';
import { View, SafeAreaView } from 'react-native';
import { Text, TextLink, H1, H2, H3, ShadowBox } from 'ui';

const SessionDetails = ({ route, navigation }) => {
  const sessionId = route?.params?.sessionId;
  const { data, loading } = useQuery(SESSION_FULL_DETAILS, {
    variables: { id: sessionId },
  });
  const session = data?.node;
  const submissions = (session?.submissions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const notes = (session?.notes?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        {session?.canParticipate?.value && (
          <TextLink
            title="Participer"
            onPress={() =>
              navigation.navigate('CreateSubmission', { sessionId: sessionId })
            }
          />
        )}

        <H2>Propositions :</H2>
        {submissions.length > 0 ? (
          <>
            {submissions.map(({ id, book, user }) => (
              <View key={id}>
                <Text>
                  {book.title}, {book.author} - {user.username}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <Text>Aucun-e inscrit-e pour le moment.</Text>
        )}

        {Boolean(session?.selectedBook) && (
          <>
            <H2>Livre sélectionné :</H2>
            <Text>
              {session?.selectedBook?.title}, {session?.selectedBook?.author}
            </Text>
          </>
        )}

        {notes.length > 0 && (
          <>
            <H2>Notes :</H2>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {notes.map(({ id, value, user }) => (
                <View key={id} style={{ width: '33%' }}>
                  <View style={{ alignItems: 'center' }}>
                    <H3>{value}</H3>
                    <Text>{user?.username}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SessionDetails;
