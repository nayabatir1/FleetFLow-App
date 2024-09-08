import {ModalProps} from 'react-native';
import {Result} from '../../../api/requests/SearchAddress.requests.types';

export interface SearchModalProps extends ModalPropsType {
  onPress: (arg0: Result) => void;
  placeholder: string;
}

export type ModalPropsType = {
  hide: () => void;
} & ModalProps;
