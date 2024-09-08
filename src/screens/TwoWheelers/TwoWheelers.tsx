import {View} from 'react-native';
import React, {
  memo,
  startTransition,
  useCallback,
  useRef,
  useState,
} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ControlledTextInput from '../../components/ControlledTextInput/ControlledTextInput';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import ControlledPicker from '../../components/ControlledPicker/ControlledPicker';
import ReadOnlyText from '../../components/ReadOnlyText/ReadOnlyText';
import {RefType} from './TwoWheelers.types';
import BlockButton from '../../components/Buttons/BlockButton';
import Description from '../../../data/Description.data';
import SearchAddressModal from '../../components/Modals/SearchAddressModal';
import TwoWheelersConfirmationModal from '../../components/Modals/TwoWheelersConfirmationModal';
import {useTwoWheelerOrder} from '../../api/query/createOrder.queries';
import {TwoWheelerOrderResponse} from '../../api/requests/CreateOrder.types';

const schema = yup.object({
  pickupAddr: yup.string().trim().required('Pick up address is required'),
  dropAddr: yup.string().trim().required('Drop address is required'),
  phone: yup.string().trim().required('Phone number is required'),
  description: yup.string().trim().required('Select requirement type'),
  pickupLng: yup.number().required(),
  pickupLat: yup.number().required(),
  dropLat: yup.number().required(),
  dropLng: yup.number().required(),
});

const defaultValues = {
  pickupAddr: '',
  dropAddr: '',
  phone: '',
  description: '',
  pickupLat: 0,
  pickupLng: 0,
  dropLat: 0,
  dropLng: 0,
};

function TwoWheelers() {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [resp, setResp] = useState<TwoWheelerOrderResponse['data']>({
    priceMax: 0,
    priceMin: 0,
    weight: 0,
  });

  const ref = useRef<RefType>({});

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const toggleVisible = useCallback((type?: RefType['type']) => {
    if (type) {
      ref.current.type = type;
    }
    setVisible(p => !p);
  }, []);

  const setItem = useCallback(
    (item: RefType['pickup']) => {
      if (ref.current.type === 'pickup') {
        form.setValue('pickupLat', item?.geometry.location.lat || 0);
        form.setValue('pickupLng', item?.geometry.location.lng || 0);
        form.setValue('pickupAddr', item?.formatted_address || '');
      } else if (ref.current.type === 'drop') {
        form.setValue('dropLat', item?.geometry.location.lat || 0);
        form.setValue('dropLng', item?.geometry.location.lng || 0);
        form.setValue('dropAddr', item?.formatted_address || '');
      }

      toggleVisible();
    },
    [form, toggleVisible],
  );

  const createOrder = useTwoWheelerOrder();

  const submit = form.handleSubmit(async data => {
    createOrder.mutateAsync(data, {
      onSuccess: response => {
        console.log(response);
        startTransition(() => {
          setResp(response.data);
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
      <View>
        <FormProvider {...form}>
          <ReadOnlyText
            label="Pickup Address"
            name="pickupAddr"
            required
            placeholder="Sending From"
            onPress={() => toggleVisible('pickup')}
          />

          <ReadOnlyText
            label="Drop Address"
            name="dropAddr"
            required
            placeholder="Sending To"
            onPress={() => toggleVisible('drop')}
          />

          <ControlledTextInput
            label="Phone Number"
            name="phone"
            required
            placeholder="Enter contact details"
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

      <SearchAddressModal
        visible={visible}
        hide={toggleVisible}
        placeholder="Enter Address"
        onPress={setItem}
      />

      <TwoWheelersConfirmationModal
        hide={toggleResultModal}
        visible={show}
        priceMax={resp.priceMax}
        priceMin={resp.priceMin}
        weight={resp.weight}
      />
    </>
  );
}

export default memo(TwoWheelers);
