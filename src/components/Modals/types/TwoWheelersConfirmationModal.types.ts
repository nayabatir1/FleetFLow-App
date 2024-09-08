import {ModalPropsType} from './SearchAddressModal.types';

export interface TwoWheelersConfirmationModalProps extends ModalPropsType {
  priceMin: number;
  priceMax: number;
  weight: number;
}
