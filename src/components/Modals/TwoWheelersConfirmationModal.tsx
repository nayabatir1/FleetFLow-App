import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ModalWrapper from './ModalWrapper';
import React, {memo} from 'react';
import {TwoWheelersConfirmationModalProps} from './types/TwoWheelersConfirmationModal.types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

function TwoWheelersConfirmationModal({
  priceMax,
  priceMin,
  weight,
  hide,
  visible,
}: TwoWheelersConfirmationModalProps) {
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
          <View style={[styles.box, styles.flexRow]}>
            <Image
              style={styles.image}
              source={require('../../../assets/images/2_wheeler.png')}
            />

            <View>
              <Text>2 Wheeler</Text>
              <Text style={styles.price}>
                ₹{priceMin} - ₹{priceMax}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <MaterialIcon name="weight" size={20} color="black" />
              <Text> {weight} kg</Text>
            </View>
          </View>
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
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  box: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 110,
    resizeMode: 'contain',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
});

export default memo(TwoWheelersConfirmationModal);
