import React, { useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import mapStyles from '@/assets/map/style_dark.json';

interface MapScreenProps {}

const MapScreen: React.FC<MapScreenProps> = () => {
  const mapRef = useRef<MapView>(null);

  return (
      <MapView
        ref={mapRef}
        style={{ flex: 1 }} // take as much space as possible
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyles}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
      />
  );
};

export default MapScreen;
