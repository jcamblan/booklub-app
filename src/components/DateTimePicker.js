import React, { useState } from 'react';
import { default as RNDateTimePicker } from '@react-native-community/datetimepicker';
import { theme } from 'ui';

const DateTimePicker = ({ ...props }) => {
  return (
    <RNDateTimePicker
      testID="dateTimePicker"
      mode={'datetime'}
      textColor={theme.colors.text}
      is24Hour={true}
      display="default"
      locale="fr-FR"
      minuteInterval={30}
      minimumDate={new Date()}
      style={{ height: 100 }}
      {...props}
    />
  );
};

export default DateTimePicker;
