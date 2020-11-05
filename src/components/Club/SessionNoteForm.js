import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, theme, Separator, H3 } from 'ui';
import Slider from '@react-native-community/slider';
import { useMutation } from '@apollo/client';
import { NOTE_SESSION } from 'api/mutations';

export const SessionNoteForm = ({ session, userNote }) => {
  const [note, setNote] = useState(userNote?.value || 5);
  const [noteSession] = useMutation(NOTE_SESSION, {
    refetchQueries: ['session'],
  });

  const handleSlidingComplete = async () => {
    try {
      await noteSession({
        variables: {
          input: {
            sessionId: session.id,
            noteValue: note,
          },
        },
      });
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <View style={{ paddingHorizontal: theme.spacing(2), alignItems: 'center' }}>
      {!Boolean(userNote) && <Text>Vous avez lu le livre ? Notez le !</Text>}
      <H3>{note}/10</H3>
      <Slider
        style={{ width: '100%', height: 50 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={note}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.secondary}
        onValueChange={value => setNote(value)}
        onSlidingComplete={() => handleSlidingComplete()}
      />
      {/* <TextLink title="Valider mon vote" /> */}
      <Separator />
    </View>
  );
};

export default SessionNoteForm;
