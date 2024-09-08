import React, {memo, useMemo} from 'react';
import {get, useFormContext} from 'react-hook-form';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ReadOnlyProps} from './ReadOnlyText.types';

function ReadOnlyText({
  name,
  label,
  required,
  placeholder,
  onPress,
}: ReadOnlyProps) {
  const form = useFormContext();

  const error = get(form.formState.errors, name);
  const value = form.watch(name);

  const wrapperStyle = useMemo(
    () =>
      error?.message
        ? StyleSheet.flatten([styles.valueWrapper, styles.errorValueWrapper])
        : styles.valueWrapper,
    [error?.message],
  );

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      {!!label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <View style={wrapperStyle}>
        {value ? (
          <Text style={styles.value}>{value}</Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
      </View>
      {!!error?.message && (
        <Text style={styles.errorText}>{error?.message}</Text>
      )}
    </TouchableOpacity>
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
  valueWrapper: {
    borderWidth: 1,
    zIndex: -10,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
    borderColor: 'grey',
    ...Platform.select({
      ios: {
        height: 50,
        marginBottom: 5,
        padding: 5,
      },
      android: {
        height: 50,
      },
    }),
  },
  value: {
    color: 'black',
  },
  placeholder: {
    color: 'grey',
  },
  errorValueWrapper: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
});

export default memo(
  ReadOnlyText,
  (prevPros, nextPros) =>
    prevPros.name === nextPros.name &&
    prevPros.label === nextPros.label &&
    prevPros.required === nextPros.required,
);
