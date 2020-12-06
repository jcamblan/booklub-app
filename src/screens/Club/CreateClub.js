import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import { ScreenTitle, Text, theme } from 'ui';
import { Input, Error } from 'ui/form';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_CLUB } from 'api/mutations';
import { Button } from 'ui/button';
import ImagePicker from 'components/ImagePicker';
import { ReactNativeFile } from 'apollo-upload-client';
import { t } from 'i18n-js';

const CreateClub = ({ navigation }) => {
  const [imageUri, setImageUri] = useState();
  const [createClub] = useMutation(CREATE_CLUB, {
    refetchQueries: ['myClubs'],
  });

  const file = new ReactNativeFile({
    uri: imageUri,
    name: 'a.jpg',
    type: 'image/jpeg',
  });

  const handleCreateClub = async values => {
    try {
      await createClub({
        variables: {
          input: { file, ...values },
        },
      });
      navigation.navigate('ClubHome');
    } catch (err) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ padding: 20, flex: 1 }}>
          <ScreenTitle>Create a club</ScreenTitle>
          <Text style={{ marginBottom: theme.spacing() }}>
            {t('screens.CreateClub.explanation')}
          </Text>
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
              <View style={{ width: '100%', flex: 1 }}>
                <Input
                  label={t('screens.CreateClub.inputLabel')}
                  placeholder={t('screens.CreateClub.inputPlaceholder')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  returnKeyType="send"
                  error={touched.name && errors.name}
                  onSubmitEditing={() => handleSubmit(values)}
                  autoFocus={true}
                />
                <ImagePicker onPickImage={uri => setImageUri(uri)} />
                <Error>{status}</Error>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flex: 1,
                    paddingBottom: 285,
                  }}
                >
                  <Button
                    onPress={() => handleSubmit(values)}
                    isLoading={isSubmitting}
                    primary
                  >
                    {t('screens.CreateClub.submitButton')}
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

export default CreateClub;
