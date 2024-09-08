import React, {memo, useMemo} from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {Platform, StyleSheet, Text, View} from 'react-native';

import ControlledPickerProps from './ControlledPicker.types';
import {Dropdown} from 'react-native-element-dropdown';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import {DescriptionDataType} from '../../../data/Description.type';

function ControlledPicker({
  name,
  label,
  required,
  data,
  placeholder,
  labelField,
  valueField,
}: Omit<DropdownProps<DescriptionDataType>, 'value' | 'onChange'> &
  ControlledPickerProps) {
  const form = useFormContext();

  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({name, control: form.control});

  const dropdownStyle = useMemo(
    () =>
      error?.message
        ? StyleSheet.flatten([styles.dropdown, styles.errorDropdown])
        : styles.dropdown,
    [error?.message],
  );

  return (
    <View style={styles.wrapper}>
      {!!label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <Dropdown
        value={value}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        style={dropdownStyle}
        data={data}
        labelField={labelField}
        valueField={valueField}
        onChange={e => onChange(e.value)}
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  placeholder: {
    color: 'grey',
  },
  dropdown: {
    backgroundColor: 'white',
    zIndex: 0,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
  },
  errorDropdown: {
    borderColor: 'red',
  },
  dropdownContainer: {
    zIndex: 10,
  },
});

export default memo(
  ControlledPicker,
  (prevPros, nextPros) =>
    prevPros.name === nextPros.name &&
    prevPros.label === nextPros.label &&
    prevPros.required === nextPros.required &&
    prevPros.placeholder === nextPros.placeholder,
);
