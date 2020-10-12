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
import { TextLink, Title } from 'ui';
import { Input, Error } from 'ui/form';
import book from 'images/book.png';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const JOIN_CLUB = gql`
  mutation joinClub($input: JoinClubInput!) {
    joinClub(input: $input) {
      club {
        name
        id
      }
      errors {
        attribute
        error
        message
        path
      }
    }
  }
`;

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
          <Title>Rejoindre un club</Title>
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
