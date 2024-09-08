import {useMutation} from '@tanstack/react-query';
import {
  createPackersMoversOrder,
  createParcelOrder,
  createTrucksOrder,
  createTwoWheelerOrder,
} from '../requests/createOrder.requests';

export const useTwoWheelerOrder = () =>
  useMutation({
    mutationFn: (body: BodyInit_) => createTwoWheelerOrder(body),
  });

export const useTrucksOrder = () =>
  useMutation({
    mutationFn: (body: BodyInit_) => createTrucksOrder(body),
  });

export const usePackersMoversOrder = () =>
  useMutation({
    mutationFn: (body: BodyInit_) => createPackersMoversOrder(body),
  });

export const useParcelOrder = () =>
  useMutation({
    mutationFn: (body: BodyInit_) => createParcelOrder(body),
  });
