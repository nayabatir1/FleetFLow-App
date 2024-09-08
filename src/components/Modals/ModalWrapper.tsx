import {Modal} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {ModalPropsType} from './types/SearchAddressModal.types';

export default function ({
  children,
  visible,
  hide,
}: ModalPropsType & PropsWithChildren) {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={hide}
      hardwareAccelerated>
      {children}
    </Modal>
  );
}
