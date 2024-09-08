import {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {BlockButtonProps} from './BlockButton.type';
import {ActivityIndicator} from 'react-native';

function BlockButton({label, onPress, isLoading}: BlockButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size={20} color="white" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
  },
});

export default memo(BlockButton);
