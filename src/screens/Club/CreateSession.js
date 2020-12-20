import React, { useState } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { ScreenTitle, Headline, Button, theme } from 'ui';
import DateTimePicker from 'components/DateTimePicker';
import { Input } from 'ui/form';
import { useMutation } from '@apollo/client';
import { CREATE_SESSION } from 'api/mutations';
import { t } from 'i18n-js';

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
            readDueDate: readDueDate,
            submissionDueDate: submissionDueDate,
          },
        },
      });
      navigation.goBack();
    } catch (err) {}
  };

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: theme.spacing() }}>
        <ScreenTitle>{t('screens.CreateSession.title')}</ScreenTitle>

        <Headline>
          {t('screens.CreateSession.submissionDueDateHeadline')}
        </Headline>
        <DateTimePicker
          onChange={(event, date) => setSubmissionDueDate(date)}
          value={submissionDueDate}
        />
        <Headline>{t('screens.CreateSession.readDueDateHeadline')}</Headline>
        <DateTimePicker
          onChange={(event, date) => setReadDueDate(date)}
          value={readDueDate}
        />
        <Button onPress={handleCreateSession} primary>
          {t('screens.CreateSession.submitButton')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CreateSession;
