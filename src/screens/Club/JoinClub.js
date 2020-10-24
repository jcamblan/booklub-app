import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { TextLink, H1 } from 'ui';
import { Input, Error } from 'ui/form';
import book from 'images/book.png';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { JOIN_CLUB } from 'api/mutations';

const JoinClub = ({ navigation }) => {
  const [joinClub] = useMutation(JOIN_CLUB);

  const handleJoinClub = async (values, { setStatus }) => {
    try {
      const { data } = await joinClub({
        variables: {
          input: values,
        },
      });

      const errors = data?.joinClub?.errors;

      if (Boolean(errors)) {
        const status = errors.map((error) => error.message).join(', ');
        setStatus(status);
      } else {
        navigation.navigate('ClubHome');
      }
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20 }}>
          <Formik
            validationSchema={Yup.object().shape({
              invitationCode: Yup.string(),
            })}
            initialValues={{ invitationCode: '' }}
            onSubmit={handleJoinClub}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              handleBlur,
              status,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={{ width: '100%' }}>
                <Input
                  label="Code d'invitation"
                  placeholder="1234568"
                  value={values.name}
                  onChangeText={handleChange('invitationCode')}
                  onBlur={handleBlur('invitationCode')}
                  returnKeyType="send"
                  style={{ marginBottom: 16 }}
                  error={touched.invitationCode && errors.invitationCode}
                  onSubmitEditing={() => handleSubmit(values)}
                />
                <Error>{status}</Error>
                <View style={{ alignItems: 'center' }}>
                  <TextLink
                    title="Valider"
                    onPress={() => handleSubmit(values)}
                    isLoading={isSubmitting}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JoinClub;
