import Http from '../http';
import {
  PackersMoversResponse,
  ParcelResponse,
  TrucksResponse,
  TwoWheelerOrderResponse,
} from './CreateOrder.types';

export const createTwoWheelerOrder = (body?: BodyInit_) => {
  const path = '/two-wheelers';

  return Http.Post<TwoWheelerOrderResponse>(path, body);
};

export const createTrucksOrder = (body?: BodyInit_) => {
  const path = '/trucks';

  return Http.Post<TrucksResponse>(path, body);
};

export const createPackersMoversOrder = (body?: BodyInit_) => {
  const path = '/packers-movers';

  return Http.Post<PackersMoversResponse>(path, body);
};

export const createParcelOrder = (body?: BodyInit_) => {
  const path = '/parcels';

  return Http.Post<ParcelResponse>(path, body);
};
