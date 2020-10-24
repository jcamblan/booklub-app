import React from 'react';
import { TextLink } from 'ui/index';
import {
  KeyboardAvoidingView,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import { Input, Error } from 'ui/form';
import { Button, H1 } from 'ui';
import { signIn } from 'api/auth';
import { useAuth } from 'hooks';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import book from 'images/book.png';
import LogoName from 'components/LogoName';

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
        style={{ flex: 1 }}
      >
        <ScrollView style={{ padding: 20 }} alwaysBounceVertical={false}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <LogoName />

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
                    style={{ marginBottom: 16 }}
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
                  <TextLink
                    title="Mot de passe oublié ?"
                    onPress={() =>
                      navigation.navigate('ForgotPassword', {
                        email: values.username,
                      })
                    }
                  />
                  <Error>{status}</Error>
                  <View style={{ marginTop: 32, alignItems: 'center' }}>
                    <TextLink
                      title="Connexion"
                      onPress={() => handleSubmit(values)}
                      isLoading={isSubmitting}
                    />
                  </View>
                </View>
              )}
            </Formik>
            <TextLink
              title="Première connexion ?"
              onPress={() => navigation.navigate('ProfilePicker')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
