import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { TextLink, H1, theme } from 'ui';
import { Input, Error } from 'ui/form';
import { signIn } from 'api/auth';
import { useAuth } from 'hooks';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import BooklubTitle from 'components/BooklubTitle';
import image from 'images/reading_book.png';
import { Button } from 'ui/button';

const Login = ({ navigation }) => {
  const { onUpdate } = useAuth();

  const handleSubmitForm = async (values, { setStatus }) => {
    try {
      const { data } = await signIn(values);
      onUpdate(data);
    } catch (err) {
      console.dir(err);
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
            <H1>Sign in</H1>
            <Image
              source={image}
              style={{
                width: theme.screenWidth,
                height: theme.screenWidth * 0.687444345503117,
                resizeMode: 'contain',
              }}
            />

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
                    label="E-mail"
                    placeholder="E-mail"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType="emailAddress"
                    error={touched.username && errors.username}
                  />
                  <Input
                    label="Mot de passe"
                    placeholder="Mot de passe"
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
                      variant="primary"
                    >
                      Sign me in
                    </Button>

                    <Button
                      onPress={() => navigation.navigate('Register')}
                      isLoading={isSubmitting}
                    >
                      I don't have an account
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
