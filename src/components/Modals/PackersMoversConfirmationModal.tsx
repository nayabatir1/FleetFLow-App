import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ModalWrapper from './ModalWrapper';
import React, {memo} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ModalPropsType} from './types/SearchAddressModal.types';

function PackersMoversConfirmationModal({hide, visible}: ModalPropsType) {
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
            source={require('../../../assets/images/thx.jpg')}
          />
          <Text style={styles.textCenter}>
            Thank you for reaching out our team will contact you shortly
          </Text>
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
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});

export default memo(PackersMoversConfirmationModal);
