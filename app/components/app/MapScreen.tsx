import React, { useEffect, useRef } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapStyles from '@/assets/map/style_dark.json';

interface MapScreenProps {}

const MapScreen: React.FC<MapScreenProps> = () => {
  const mapRef = useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyles}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
