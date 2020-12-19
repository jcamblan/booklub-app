import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Error } from 'ui/form';
import { t } from 'i18n-js';
import ImagePicker from 'components/ImagePicker';
import { ReactNativeFile } from 'apollo-upload-client';
import { Button } from 'ui/button';

const UpdateForm = ({ onUpdate, club }) => {
  const [imageUri, setImageUri] = useState();

  const file = new ReactNativeFile({
    uri: imageUri,
    name: 'a.jpg',
    type: 'image/jpeg',
  });

  const handleUpdate = values => {
    onUpdate({ clubId: club?.id, file, ...values });
  };

  return (
    <View>
      <Formik
        validationSchema={Yup.object().shape({ name: Yup.string() })}
        initialValues={{ name: club?.name }}
        onSubmit={handleUpdate}
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
                {t('screens.Club.updateButton')}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdateForm;
