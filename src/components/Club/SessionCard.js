import React from 'react';
import { View } from 'react-native';
import { formatDistanceDate, formatDate, findNoteColor } from 'utils';
import { H1, theme, Card, Text } from 'ui';

const StatePill = ({ pillState, sessionState }) => {
  const states = {
    submission: 'Inscript.',
    draw: 'Tirage',
    reading: 'Lecture',
    conclusion: 'Vote',
    archived: 'Archivé',
  };

  const backgroundColor =
    pillState === sessionState
      ? theme.colors.highlight.text
      : theme.colors.highlight.secondary;

  const color =
    pillState === sessionState
      ? theme.colors.highlight.background
      : theme.colors.highlight.ternary;

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

const SessionCard = ({ session, current = false, style }) => {
  const book = session?.selectedBook;
  const submitters = session?.selectedBookSubmitters?.nodes;
  const readDueDate = formatDate(session?.readDueDate, 'dd/MM/yyyy');
  const submissionDueDate = formatDistanceDate(session?.submissionDueDate);
  const note =
    (session?.notes?.edges ?? [])
      .map(({ node: { value } }) => value)
      .reduce((sum, note) => sum + note, 0) / session?.notes?.edges?.length;

  const textColor = current ? theme.colors.highlight.text : theme.colors.text;

  return (
    <View style={{ width: '100%', ...style }}>
      {current && <StateBar state={session?.state} />}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexShrink: 2 }}>
          {Boolean(book) && session?.state !== 'submission' && (
            <>
              <Text
                style={{
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontSize: 20,
                  color: textColor,
                }}
              >
                {book?.title}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: textColor,
                }}
              >
                {book?.author}
              </Text>

              <Text style={{ color: textColor }}>
                Proposé par :{' '}
                {submitters?.map((user) => user.username).join(', ')}
              </Text>
            </>
          )}

          {(session?.state === 'submission' || session?.state === 'draw') && (
            <Text style={{ color: textColor }}>
              {session?.submissions?.totalCount} livres proposés
            </Text>
          )}

          <Text style={{ color: textColor }}>
            {session?.submissions?.totalCount} inscrits
          </Text>

          {session?.state === 'submission' && (
            <Text style={{ color: textColor }}>
              Tirage au sort : {submissionDueDate}
            </Text>
          )}
          <Text style={{ color: textColor }}>
            Fin de la session le : {readDueDate}
          </Text>
        </View>

        {!current && Boolean(note) && (
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: findNoteColor(note),
                width: 45,
                paddingVertical: 6,
                borderRadius: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: theme.colors.lightText,
                    fontSize: 20,
                  }}
                >
                  {note}
                </Text>
              </View>
              <View alignItems="center">
                <View
                  style={{
                    borderBottomColor: theme.colors.lightText,
                    borderBottomWidth: 1,
                    width: '50%',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: theme.colors.lightText,
                    fontSize: 20,
                  }}
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

export default SessionCard;
