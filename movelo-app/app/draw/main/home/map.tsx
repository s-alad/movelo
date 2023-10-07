import React, {useEffect, useState} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyles from "../../../../dummy_data/mapStyles.json";
import mapMarkers from "../../../../dummy_data/dummyMarkers.json";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from "@env";

const axios = require('axios');

type Location = {
    latitude: number;
    longitude: number;
} | null;

async function getBikingDistance(origin: Location, destination: Location) {
    if (!origin || !destination) {
        throw new Error('Origin or destination is null');
    }
    const endpoint = 'https://maps.googleapis.com/maps/api/directions/json';

    try {
        const response = await axios.get(endpoint, {
            params: {
                origin: `${origin.latitude},${origin.longitude}`,
                destination: `${destination.latitude},${destination.longitude}`,
                mode: 'bicycling',
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.routes[0] && response.data.routes[0].legs[0]) {
            return response.data.routes[0].legs[0].distance;
        } else {
            throw new Error('No route found.');
        }
    } catch (error) {
        console.error(`Failed to get biking distance: ${error}`);
    }
}

const renderMap = (styles: any) => {

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

    const [userLocation, setUserLocation] = useState<Location>(null);
    const [destination, setDestination] = useState<Location>(null);

    // Handler for marker press to set destination
    const handleMarkerPress = (coordinate: Location) => {
        setDestination(coordinate);
    };


    useEffect(() => {
        const fetchUserLocation = async () => {
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
    }, []);  // Note the addition of dependency array.

    if (userLocation && destination) {
        getBikingDistance(userLocation, destination).then((distance) => {
            console.log("Distance: " + distance.text);
        });
    }

    return (
        <MapView
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
        >
            {/* TODO add markers for each sponsorship */}
            {mapMarkers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    onPress={() => handleMarkerPress(marker.latlng)}
                />
            ))}

            {/* Show directions from user's location to destination */}
            {userLocation && destination && (
                <>
                    {/* Thicker line for the "border" */}
                    {/*<MapViewDirections
                        origin={userLocation}
                        mode={'BICYCLING'}
                        destination={destination}
                        apikey={GOOGLE_MAPS_API_KEY}
                        strokeWidth={8}
                        strokeColor="black"
                    />*/}
                    {/* Thinner line on top for the actual path */}
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

export default renderMap;
