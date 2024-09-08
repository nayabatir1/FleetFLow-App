import {GOOGLE_API_KEY} from '@env';
import Http from '../http';
import {SearchAddress} from './SearchAddress.requests.types';
import {SearchPincode} from './SearchPincode.requests.types';

const GOOGLE_API = 'https://maps.googleapis.com';

export const searchAddress = (text?: string) => {
  const searchParams = new URLSearchParams();

  if (text) {
    searchParams.append('query', text);
  }

  searchParams.append('key', GOOGLE_API_KEY);

  const path = '/maps/api/place/textsearch/json'.concat(
    '?',
    searchParams.toString(),
  );

  return Http.Get<SearchAddress>(path, {baseURL: GOOGLE_API});
};

export const searchPincode = (text?: string) => {
  const searchParams = new URLSearchParams();

  if (text) {
    searchParams.append('address', text);
  }

  searchParams.append('key', GOOGLE_API_KEY);

  const path = '/maps/api/geocode/json'.concat('?', searchParams.toString());

  return Http.Get<SearchPincode>(path, {baseURL: GOOGLE_API});
};
