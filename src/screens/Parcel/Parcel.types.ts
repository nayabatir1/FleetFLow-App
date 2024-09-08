import {Result} from '../../api/requests/SearchPincode.requests.types';

export type TwoWheelersSearch = {
  pickup: string;
  drop: string;
};

export type TwoWheelersAction = {
  type: 'pickup' | 'drop';
  value: string;
};

export type RefType = {
  type?: 'pickup' | 'drop';
  pickup?: Result;
  drop?: Result;
};
