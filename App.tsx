import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import HomeScreen from './src/screens/Home';
import TwoWheelers from './src/screens/TwoWheelers/TwoWheelers';
import Trucks from './src/screens/Trucks/Trucks';
import PackersMovers from './src/screens/PackerMovers/PackersMovers';
import AllIndiaParcel from './src/screens/Parcel/Parcel';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {RootStackNavigator} from './types/StackNavigator.types';

const Stack = createNativeStackNavigator<RootStackNavigator>();

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: styles.content,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: 'Home',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TwoWheelers"
            component={TwoWheelers}
            options={{
              headerTitle: 'Two Wheelers',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Trucks"
            component={Trucks}
            options={{
              headerTitle: 'Trucks',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="PackersMovers"
            component={PackersMovers}
            options={{
              headerTitle: 'Packers and Movers',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Parcels"
            component={AllIndiaParcel}
            options={{
              headerTitle: 'Parcels',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  content: {backgroundColor: 'white', padding: 20},
});
