import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../types/StackNavigator.types';

export default function Home() {
  const navigation = useNavigation<Navigation>();

  return (
    <>
      <TouchableOpacity
        style={styles.flexRow}
        onPress={() => navigation.navigate('TwoWheelers')}>
        <Text style={styles.title}>Two Wheelers</Text>
        <Image
          source={require('../../assets/images/bike.jpg')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.flexRow}
        onPress={() => navigation.navigate('Trucks')}>
        <Text style={styles.title}>Trucks</Text>
        <Image
          source={require('../../assets/images/trucks.jpg')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.flexRow}
        onPress={() => navigation.navigate('PackersMovers')}>
        <Text style={styles.title}>Packers and Movers</Text>
        <Image
          source={require('../../assets/images/packers.jpg')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.flexRow}
        onPress={() => navigation.navigate('Parcels')}>
        <Text style={styles.title}>Parcels</Text>
        <Image
          source={require('../../assets/images/parcel.jpg')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E85C0D',
    marginVertical: 10,
    borderRadius: 15,
  },
  logo: {
    height: 100,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: 'white',
  },
});
