import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Platform,
  Image,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import { ScreenTitle, theme, Button } from 'ui';
import { Input, Error } from 'ui/form';
import { signIn } from 'api/auth';
import { useAuth } from 'hooks';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import BooklubTitle from 'components/BooklubTitle';
import { t } from 'i18n-js';

const Login = ({ navigation }) => {
  const { onUpdate } = useAuth();

  const handleSubmitForm = async (values, { setStatus }) => {
    try {
      const { data } = await signIn(values);
      onUpdate(data);
    } catch (err) {
      const error = err?.response?.data?.error;
      setStatus(ERRORS?.[error.toUpperCase()]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: theme.spacing() }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
            }}
          >
            <ScreenTitle>{t('screens.Login.title')}</ScreenTitle>

            <Formik
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .email(ERRORS.EMAIL)
                  .required(ERRORS.REQUIRED),
                password: Yup.string().required(ERRORS.REQUIRED),
              })}
              initialValues={{ username: '', password: '' }}
              onSubmit={handleSubmitForm}
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
                    label={t('screens.Login.email')}
                    placeholder={t('screens.Login.email')}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType="emailAddress"
                    error={touched.username && errors.username}
                    autoFocus
                  />
                  <Input
                    label={t('screens.Login.password')}
                    placeholder={t('screens.Login.password')}
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
                      {t('screens.Login.submit')}
                    </Button>

                    <Button
                      onPress={() => navigation.navigate('Register')}
                      isLoading={isSubmitting}
                    >
                      {t('screens.Login.register')}
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

export default Login;
