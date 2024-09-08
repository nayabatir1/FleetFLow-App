import {useQuery} from '@tanstack/react-query';
import {searchAddress, searchPincode} from '../requests/google.request';

export const useSearchAddress = (text?: string) =>
  useQuery({
    queryKey: [text],
    queryFn: () => searchAddress(text),
    enabled: !!text,
    retry: false,
  });

export const useSearchPincode = (text?: string) =>
  useQuery({
    queryKey: [text],
    queryFn: () => searchPincode(text),
    enabled: !!text,
    retry: false,
  });
