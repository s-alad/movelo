import React, {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyles from "../dummy_data/mapStyles.json";
import mapMarkers from "../dummy_data/dummyMarkers.json";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from "@env";
import {calculateBearing, getBikingDistance, MyLatLng} from "../util/mapmath";

// Data for the user
const [userLocation, setUserLocation] = useState<MyLatLng | null>(null);
const [destination, setDestination] = useState<MyLatLng | null>(null);
const mapRef = useRef<MapView>(null);


interface Props {
    styles: any;
}

/**
 * Start traveling to the selected location. This will animate the camera.
 */
export function startTravel(destination: MyLatLng) {
    setDestination(destination);
    if (userLocation)
        animate(userLocation, destination);
}


/**
 * Animate the camera to the given location.
 */
async function animate(origin: MyLatLng, destination: MyLatLng) {
    if (!mapRef.current)
        return;

    mapRef.current.animateCamera({
        heading: calculateBearing(origin, destination),
        zoom: 16,
        center: {
            latitude: origin.latitude,
            longitude: origin.longitude,
        },
        pitch: 45,
    });
}

export default function Map({styles}: Props) {

    // Request user permission to use location
    console.log("Google API Key: " + GOOGLE_MAPS_API_KEY);

    useEffect(() => {
        const fetchUserLocation = async () => {
            // Ask for permissions first
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation({ latitude, longitude });
            } else {
                alert('Location permission not granted');
            }
        };

        fetchUserLocation();
    }, []);

    return (
        <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyles}
            initialRegion={{
                latitude: 42.371433,
                longitude: -71.128903,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsCompass={false}
            showsMyLocationButton={false}
        >
            {mapMarkers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    onPress={() => startTravel(marker.latlng)}
                />
            ))}

            {/* Show directions from user's location to destination */}
            {userLocation && destination && (
                <>
                    <MapViewDirections
                        origin={userLocation}
                        mode={'BICYCLING'}
                        destination={destination}
                        apikey={GOOGLE_MAPS_API_KEY}
                        strokeWidth={6}
                        strokeColor="white"
                    />
                </>
            )}
        </MapView>
    );
}
