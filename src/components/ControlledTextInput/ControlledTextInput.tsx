import React, {memo, useMemo} from 'react';

import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import ControlledTextInputProps from './ControlledTextInputProps.types';
import {useController, useFormContext} from 'react-hook-form';

function ControlledTextInput({
  name,
  label,
  required,
  ...props
}: ControlledTextInputProps) {
  const form = useFormContext();

  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({name, control: form.control});

  const inputStyle = useMemo(
    () =>
      error
        ? StyleSheet.flatten([
            styles.textInput,
            styles.defaultInputField,
            styles.errorInputField,
          ])
        : StyleSheet.flatten([styles.textInput, styles.defaultInputField]),
    [error],
  );

  return (
    <View style={styles.wrapper}>
      {!!label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChange}
        {...props}
        style={inputStyle}
      />

      {!!error?.message && (
        <Text style={styles.errorText}>{error?.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    ...Platform.select({
      ios: {
        marginBottom: 10,
      },
      android: {
        marginBottom: 7,
      },
    }),
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    zIndex: -10,
    ...Platform.select({
      ios: {
        height: 50,
        marginBottom: 5,
        padding: 5,
      },
    }),
  },
  defaultInputField: {
    borderRadius: 5,
    borderColor: 'grey',
  },
  errorInputField: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
});

export default memo(
  ControlledTextInput,
  (prevPros, nextPros) =>
    prevPros.name === nextPros.name &&
    prevPros.label === nextPros.label &&
    prevPros.required === nextPros.required,
);
