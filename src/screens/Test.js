import React from 'react';
import { TextLink } from 'ui/index';
import {
  KeyboardAvoidingView,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  Text,
  Button,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ERRORS } from 'utils';
import { Input, Error } from 'ui/form';

const Test = () => {
  const handleSubmitForm = async (values, { setStatus }) => {};
  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
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
              <View style={{ marginTop: 32 }}>
                <Button
                  title="Connexion"
                  onPress={() => handleSubmit(values)}
                  isLoading={isSubmitting}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Test;
