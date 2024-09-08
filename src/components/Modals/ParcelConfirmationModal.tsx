import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ModalWrapper from './ModalWrapper';
import React, {memo} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ParcelConfirmationModalProps} from './types/ParcelConfirmaton.types';

function ParcelConfirmationModal({
  hide,
  visible,
  price,
}: ParcelConfirmationModalProps) {
  return (
    <ModalWrapper hide={hide} visible={visible}>
      <SafeAreaView>
        <View style={styles.alignItemsEnd}>
          <EntypoIcon
            name="squared-cross"
            size={30}
            color="black"
            onPress={hide}
          />
        </View>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/okay.png')}
          />
          <Text style={styles.textCenter}>₹{price} Standard</Text>
        </View>
      </SafeAreaView>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  image: {
    height: 70,
    width: 110,
    resizeMode: 'contain',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});

export default memo(ParcelConfirmationModal);
