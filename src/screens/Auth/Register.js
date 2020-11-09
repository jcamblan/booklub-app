import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { TextLink, Text, H1, theme } from 'ui';
import { Input, Error } from 'ui/form';
import { ERRORS } from 'utils';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { signIn } from 'api/auth';
import { useAuth } from 'hooks';
import BooklubTitle from 'components/BooklubTitle';
import { Button } from 'ui/button';
import image from 'images/road_to_knowledge.png';

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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: theme.spacing() }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <H1>Sign up</H1>
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
                    label="E-mail"
                    placeholder="E-mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType="emailAddress"
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
                      Create my account
                    </Button>

                    <Button
                      onPress={() => navigation.navigate('Login')}
                      isLoading={isSubmitting}
                    >
                      I already have an account
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
