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
import { Button, Title } from 'ui';
import { Input, Error } from 'ui/form';
import book from 'images/book.png';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CREATE_CLUB = gql`
  mutation createClub($input: CreateClubInput!) {
    createClub(input: $input) {
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

const CreateClub = ({ navigation }) => {
  const [createClub] = useMutation(CREATE_CLUB, {
    refetchQueries: ['myClubs'],
  });

  const handleCreateClub = async (values) => {
    try {
      await createClub({
        variables: {
          input: values,
        },
      });
      navigation.navigate('MyClubList');
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20 }}>
          <Formik
            validationSchema={Yup.object().shape({ name: Yup.string() })}
            initialValues={{ name: '' }}
            onSubmit={handleCreateClub}
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
                  label="Nom du club"
                  placeholder="Nom du club"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  returnKeyType="send"
                  style={{ marginBottom: 16 }}
                  error={touched.name && errors.name}
                />
                <Error>{status}</Error>
                <View style={{ marginTop: 32 }}>
                  <Button
                    title="Créer votre club"
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

export default CreateClub;
