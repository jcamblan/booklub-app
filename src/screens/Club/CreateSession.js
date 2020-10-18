import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text, H2, TextLink } from 'ui';
import DateTimePicker from 'components/DateTimePicker';
import { Input } from 'ui/form';
import { useMutation } from '@apollo/client';
import { CREATE_SESSION } from 'api/mutations';

const CreateSession = ({ navigation, route }) => {
  const clubId = route?.params?.clubId;
  const [name, setName] = useState();
  const [submissionDueDate, setSubmissionDueDate] = useState(new Date());
  const [readDueDate, setReadDueDate] = useState(new Date());

  const [createSession] = useMutation(CREATE_SESSION, {
    refetchQueries: ['club'],
  });

  const handleCreateSession = async () => {
    try {
      await createSession({
        variables: {
          input: {
            clubId: clubId,
            name: name,
            readDueDate: readDueDate,
            submissionDueDate: submissionDueDate,
          },
        },
      });
      navigation.goBack();
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Input
          label="Nom de session (optionel)"
          onChangeText={(value) => setName(value)}
          textContentType="emailAddress"
          style={{ marginBottom: 16 }}
        />
        <H2>Fin des inscriptions :</H2>
        <DateTimePicker
          onChange={(event, date) => setSubmissionDueDate(date)}
          value={submissionDueDate}
        />
        <H2>Date limite de lecture :</H2>
        <DateTimePicker
          onChange={(event, date) => setReadDueDate(date)}
          value={readDueDate}
        />
        <View style={{ alignItems: 'center' }}>
          <TextLink title="Valider" onPress={handleCreateSession} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateSession;
