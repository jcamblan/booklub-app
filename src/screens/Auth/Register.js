import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { TextLink, Text } from 'ui';
import { Input, Error } from 'ui/form';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { signIn } from 'api/auth';
import { useAuth } from 'hooks';
import BooklubTitle from 'components/BooklubTitle';

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
      await register({
        variables: {
          input: values,
        },
      });

      const { data } = await signIn({
        username: values.email,
        password: values.password,
      });
      onUpdate(data);
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <BooklubTitle size={40} />
          </View>
          <Formik
            validationSchema={Yup.object().shape({
              email: Yup.string().email(ERRORS.EMAIL).required(ERRORS.REQUIRED),
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
                  label="E-mail"
                  placeholder="E-mail"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCompleteType="email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  textContentType="emailAddress"
                  style={{ marginBottom: 16 }}
                  error={touched.email && errors.email}
                />
                <Input
                  label="Pseudo"
                  placeholder="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoCompleteType="username"
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
                <Error>{status}</Error>
                <View style={{ marginTop: 32, alignItems: 'center' }}>
                  <TextLink
                    title="S'enregister"
                    onPress={() => handleSubmit(values)}
                    isLoading={isSubmitting}
                  />

                  <TextLink
                    title="Vous avez déjà un compte ?"
                    onPress={() => navigation.navigate('Login')}
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

export default Register;
