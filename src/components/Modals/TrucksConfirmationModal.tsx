import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ModalWrapper from './ModalWrapper';
import React, {memo} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {TrucksConfirmationModalProps} from './types/TrucksConfirmationModal.types';

function TwoWheelersConfirmationModal({
  tata407,
  pickup,
  dieselAuto,
  tataAce,
  hide,
  visible,
}: TrucksConfirmationModalProps) {
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
              source={require('../../../assets/images/tata_407.png')}
            />
            <View>
              <Text>Tata 407</Text>
              <Text style={styles.price}>
                ₹{tata407.priceMin} - ₹{tata407.priceMax}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <MaterialIcon name="weight" size={20} color="black" />
              <Text> {tata407.weight} kg</Text>
            </View>
          </View>

          <View style={[styles.box, styles.flexRow]}>
            <Image
              style={styles.image}
              source={require('../../../assets/images/8ft.png')}
            />
            <View>
              <Text>Pickup 8ft</Text>
              <Text style={styles.price}>
                ₹{pickup.priceMin} - ₹{pickup.priceMax}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <MaterialIcon name="weight" size={20} color="black" />
              <Text> {pickup.weight} kg</Text>
            </View>
          </View>

          <View style={[styles.box, styles.flexRow]}>
            <Image
              style={styles.image}
              source={require('../../../assets/images/3_wheeler.png')}
            />
            <View>
              <Text>3 Wheeler</Text>
              <Text style={styles.price}>
                ₹{dieselAuto.priceMin} - ₹{dieselAuto.priceMax}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <MaterialIcon name="weight" size={20} color="black" />
              <Text> {dieselAuto.weight} kg</Text>
            </View>
          </View>

          <View style={[styles.box, styles.flexRow]}>
            <Image
              style={styles.image}
              source={require('../../../assets/images/tata_ace.png')}
            />
            <View>
              <Text>Tata Ace</Text>
              <Text style={styles.price}>
                ₹{tataAce.priceMin} - ₹{tataAce.priceMax}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <MaterialIcon name="weight" size={20} color="black" />
              <Text> {tataAce.weight} kg</Text>
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
    marginBottom: 20,
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
