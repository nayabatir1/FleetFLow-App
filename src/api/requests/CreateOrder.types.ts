export type TwoWheelerOrderResponse = {
  message: string;
  data: {
    priceMin: number;
    priceMax: number;
    weight: number;
  };
};

export interface TrucksResponse {
  message: string;
  data: {
    tata407: Tata407;
    pickup: Pickup;
    dieselAuto: DieselAuto;
    tataAce: TataAce;
  };
}

export interface Tata407 {
  weight: number;
  priceMin: number;
  priceMax: number;
}

export interface Pickup {
  weight: number;
  priceMin: number;
  priceMax: number;
}

export interface DieselAuto {
  weight: number;
  priceMin: number;
  priceMax: number;
}

export interface TataAce {
  weight: number;
  priceMin: number;
  priceMax: number;
}

export interface PackersMoversResponse {
  message: string;
}

export interface ParcelResponse {
  data: {price: number};
}
