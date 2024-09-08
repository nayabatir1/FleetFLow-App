import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackNavigator = {
  Home: undefined;
  TwoWheelers: undefined;
  Trucks: undefined;
  PackersMovers: undefined;
  Parcels: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackNavigator>;
