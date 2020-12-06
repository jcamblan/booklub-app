import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { ScreenTitle, Text, theme, Button } from 'ui';
import { Input, Error } from 'ui/form';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { JOIN_CLUB } from 'api/mutations';
import { t } from 'i18n-js';

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
    } catch (err) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: theme.spacing(), flex: 1 }}>
          <ScreenTitle>{t('screens.JoinClub.title')}</ScreenTitle>
          <Text style={{ marginBottom: theme.spacing() }}>
            {t('screens.JoinClub.explanation')}
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
              <View style={{ width: '100%', flex: 1 }}>
                <Input
                  label={t('screens.JoinClub.inputLabel')}
                  placeholder={t('screens.JoinClub.inputPlaceholder')}
                  value={values.name}
                  onChangeText={handleChange('invitationCode')}
                  onBlur={handleBlur('invitationCode')}
                  returnKeyType="send"
                  error={touched.invitationCode && errors.invitationCode}
                  onSubmitEditing={() => handleSubmit(values)}
                  keyboardType="numeric"
                  autoFocus={true}
                />
                <Error>{status}</Error>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flex: 1,
                    marginBottom: 260,
                  }}
                >
                  <Button
                    onPress={() => handleSubmit(values)}
                    isLoading={isSubmitting}
                    primary
                  >
                    {t('screens.JoinClub.submitButton')}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JoinClub;
