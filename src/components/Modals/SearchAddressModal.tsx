import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalWrapper from './ModalWrapper';
import {SearchModalProps} from './types/SearchAddressModal.types';
import useDebounce from '../../hooks/useDebounce';
import {useSearchAddress} from '../../api/query/google.queries';
import Icon from 'react-native-vector-icons/Entypo';
import {Result} from '../../api/requests/SearchAddress.requests.types';

function SearchAddressModal({
  hide,
  visible,
  placeholder,
  onPress,
}: SearchModalProps) {
  const [state, setState] = useState<string>('');

  const value = useDebounce<string>(state, 300);

  const address = useSearchAddress(value);

  const items = useMemo(() => address?.data?.results || [], [address?.data]);

  const renderItem = useCallback(
    ({item}: {item: Result}) => (
      <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
        <View style={styles.wrapper}>
          <Text>{item.formatted_address}</Text>
        </View>
      </TouchableOpacity>
    ),
    [onPress],
  );

  const itemSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const emptyList = useCallback(
    () => (
      <View style={styles.container}>
        <Text style={styles.emptyItem}>No result</Text>
      </View>
    ),
    [],
  );

  const close = useCallback(() => {
    setState('');
    hide();
  }, [hide]);

  return (
    <ModalWrapper hide={close} visible={visible}>
      <SafeAreaView>
        <View style={styles.search}>
          <TextInput
            placeholder={placeholder}
            value={state}
            onChangeText={setState}
            autoFocus
          />

          <Icon name="squared-cross" size={30} color="black" onPress={hide} />
        </View>

        {address.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={items}
            keyExtractor={item => item.place_id}
            renderItem={renderItem}
            refreshing={address.isLoading}
            ItemSeparatorComponent={itemSeparator}
            ListEmptyComponent={emptyList}
          />
        )}
      </SafeAreaView>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        paddingVertical: 15,
      },
    }),
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#B5C0D0',
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 10,
  },
  wrapper: {
    backgroundColor: 'grey',
    paddingHorizontal: 5,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  separator: {
    height: 20,
  },
  emptyItem: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});

export default memo(
  SearchAddressModal,
  (prev, next) => prev.visible === next.visible,
);
