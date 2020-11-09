import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { TextLink, H1, Text, theme } from 'ui';
import { Input, Error } from 'ui/form';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { JOIN_CLUB } from 'api/mutations';
import { Button } from 'ui/button';

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
        const status = errors.map(error => error.message).join(', ');
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
        <ScrollView style={{ paddingHorizontal: theme.spacing() }}>
          <H1>Join a club</H1>
          <Text style={{ marginBottom: theme.spacing() }}>
            Enter the 8 digits invitation code provided by your friend.
          </Text>
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
                  error={touched.invitationCode && errors.invitationCode}
                  onSubmitEditing={() => handleSubmit(values)}
                  keyboardType="numeric"
                />
                <Error>{status}</Error>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Button
                    onPress={() => handleSubmit(values)}
                    isLoading={isSubmitting}
                    variant="primary"
                  >
                    Join the club
                  </Button>
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
