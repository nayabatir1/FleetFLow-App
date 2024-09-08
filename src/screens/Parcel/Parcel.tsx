import {KeyboardAvoidingView, Platform, View} from 'react-native';
import React, {memo, startTransition, useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ControlledTextInput from '../../components/ControlledTextInput/ControlledTextInput';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import ControlledPicker from '../../components/ControlledPicker/ControlledPicker';
import BlockButton from '../../components/Buttons/BlockButton';
import Description from '../../../data/Description.data';
import ParcelConfirmationModal from '../../components/Modals/ParcelConfirmationModal';
import {useParcelOrder} from '../../api/query/createOrder.queries';

const schema = yup.object({
  pickupPincode: yup
    .string()
    .trim()
    .min(4, 'Pick up pincode should be atleast 4 digits')
    .max(6, 'Pick up pincode should be atmost 6 digits')
    .required('Pick up pincode is required'),
  dropPincode: yup
    .string()
    .trim()
    .min(4, 'drop pincode should be atleast 4 digits')
    .max(6, 'drop pincode should be atmost 6 digits')
    .required('Drop pincode is required'),
  phone: yup.string().trim().required('Phone number is required'),
  weight: yup.number().positive().required('Package weight is required'),
  description: yup.string().trim().required('Select requirement type'),
  pickupLng: yup.number().required(),
  pickupLat: yup.number().required(),
  dropLat: yup.number().required(),
  dropLng: yup.number().required(),
});

const defaultValues = {
  pickupPincode: '',
  dropPincode: '',
  phone: '',
  description: '',
  weight: 0,
  pickupLat: 0,
  pickupLng: 0,
  dropLat: 0,
  dropLng: 0,
};

function Parcel() {
  const [show, setShow] = useState(false);
  const [resp, setResp] = useState({price: 0});

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const createOrder = useParcelOrder();

  const submit = form.handleSubmit(async data => {
    createOrder.mutate(data, {
      onSuccess: res => {
        startTransition(() => {
          setResp(res.data);
          toggleResultModal();
        });
      },
    });
  });

  const toggleResultModal = useCallback(() => {
    setShow(p => !p);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <FormProvider {...form}>
            <ControlledTextInput
              label="Pick up Pin Code"
              name="pickupPincode"
              required
              placeholder="Pickup pin code"
              keyboardType="number-pad"
            />

            <ControlledTextInput
              label="Drop Pin Code"
              name="dropPincode"
              required
              placeholder="Sending To"
              keyboardType="number-pad"
            />

            <ControlledTextInput
              label="Phone Number"
              name="phone"
              required
              placeholder="Enter contact details"
            />

            <ControlledTextInput
              label="Package Weight (Kg)"
              name="weight"
              required
              placeholder="Enter package weight in KG"
              keyboardType="number-pad"
            />

            <ControlledPicker
              name="description"
              label="What describes you best?"
              placeholder="Click to choose"
              required
              data={Description}
              labelField="label"
              valueField="value"
            />
          </FormProvider>
        </View>

        <BlockButton
          label="Submit"
          onPress={submit}
          isLoading={createOrder.isPending}
        />
      </KeyboardAvoidingView>

      <ParcelConfirmationModal
        visible={show}
        hide={toggleResultModal}
        price={resp.price}
      />
    </>
  );
}

export default memo(Parcel);
