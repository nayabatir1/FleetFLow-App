import {ModalPropsType} from './SearchAddressModal.types';

type Payload = {
  weight: number;
  priceMin: number;
  priceMax: number;
};

export interface TrucksConfirmationModalProps extends ModalPropsType {
  tata407: Payload;
  pickup: Payload;
  dieselAuto: Payload;
  tataAce: Payload;
}
