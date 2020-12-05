import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Image,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import { Text, ScreenTitle, theme, Button } from 'ui';
import { Input, Error } from 'ui/form';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { signIn } from 'api/auth';
import { useAuth } from 'hooks';
import BooklubTitle from 'components/BooklubTitle';
import { t } from 'i18n-js';

const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      success
      errors {
        attribute
        error
        message
        path
      }
    }
  }
`;

const Register = ({ navigation }) => {
  const [register] = useMutation(REGISTER);
  const { onUpdate } = useAuth();

  const handleRegister = async (values, { setStatus }) => {
    try {
      const {
        data: {
          register: { errors, success },
        },
      } = await register({
        variables: {
          input: values,
        },
      });

      if (errors.length > 0) {
        const error = errors[0];
        const { attribute, error: key } = error;
        setStatus(attribute + ' : ' + key);
      }

      const { data } = await signIn({
        username: values.email,
        password: values.password,
      });
      onUpdate(data);
    } catch (err) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: theme.spacing() }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <ScreenTitle>{t('screens.sign-up.title')}</ScreenTitle>

            <Formik
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email(ERRORS.EMAIL)
                  .required(ERRORS.REQUIRED),
                username: Yup.string(),
                password: Yup.string().required(ERRORS.REQUIRED),
              })}
              initialValues={{ username: '', password: '', email: '' }}
              onSubmit={handleRegister}
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
                    label={t('screens.sign-up.email')}
                    placeholder={t('screens.sign-up.email')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType="emailAddress"
                    error={touched.email && errors.email}
                    autoFocus
                  />
                  <Input
                    label={t('screens.sign-up.username')}
                    placeholder={t('screens.sign-up.username')}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    autoCompleteType="username"
                    returnKeyType="next"
                    textContentType="emailAddress"
                    error={touched.username && errors.username}
                  />
                  <Input
                    label={t('screens.sign-up.password')}
                    placeholder={t('screens.sign-up.password')}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    autoCompleteType="password"
                    textContentType="password"
                    clearTextOnFocus
                    secureTextEntry
                    returnKeyType="send"
                    error={touched.password && errors.password}
                    onSubmitEditing={() => handleSubmit(values)}
                  />
                  <Error>{status}</Error>
                  <View>
                    <Button
                      onPress={() => handleSubmit(values)}
                      isLoading={isSubmitting}
                      primary
                    >
                      {t('screens.sign-up.submit')}
                    </Button>

                    <Button
                      onPress={() => navigation.navigate('Login')}
                      isLoading={isSubmitting}
                    >
                      {t('screens.sign-up.sign-in')}
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
