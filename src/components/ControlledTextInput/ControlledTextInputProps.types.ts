import {TextInputProps} from 'react-native';

export default interface ControlledTextInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  label?: string;
  required?: boolean;
}
