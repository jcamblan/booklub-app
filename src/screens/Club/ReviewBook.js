import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { ScreenTitle, Text, theme, Button } from 'ui';
import { Input, Error } from 'ui/form';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NOTE_SESSION } from 'api/mutations';
import Star from 'images/Star';
import styled from 'styled-components/native';
import { getCover } from 'api/googleBooks';
import { t } from 'i18n-js';

const NoteWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding-vertical: ${props => `${props.theme.spacing(5)}px`};
`;

const ReviewBook = ({ navigation, route }) => {
  const session = route?.params?.session;
  const [note, setNote] = useState(session?.userNote?.value);

  const [noteSession] = useMutation(NOTE_SESSION);

  const handleSubmit = async () => {
    try {
      const data = await noteSession({
        variables: {
          input: {
            sessionId: session?.id,
            noteValue: note,
          },
        },
      });
      navigation.goBack();
    } catch (err) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: theme.spacing(),
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <ScreenTitle>
              {Boolean(session?.userNote)
                ? t('screens.ReviewBook.editTitle')
                : t('screens.ReviewBook.submitTitle')}
            </ScreenTitle>
            <Text>{t('screens.ReviewBook.explanation')}</Text>
          </View>
          <NoteWrapper>
            <TouchableOpacity onPress={() => setNote(2)}>
              <Star size={50} fill={note >= 2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNote(4)}>
              <Star size={50} fill={note >= 4} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNote(6)}>
              <Star size={50} fill={note >= 6} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNote(8)}>
              <Star size={50} fill={note >= 8} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNote(10)}>
              <Star size={50} fill={note === 10} />
            </TouchableOpacity>
          </NoteWrapper>
          <View>
            <Button primary onPress={handleSubmit}>
              {t('screens.ReviewBook.saveButton')}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReviewBook;
