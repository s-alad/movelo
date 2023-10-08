import { Image } from "react-native";
import { useRef, useState, useEffect } from "react";
import * as React from 'react';
import { Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyles from "../dummy_data/mapStyles.json";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import {GOOGLE_MAPS_API_KEY} from "@env";
import {calculateBearing, getZoomLevel, haversineDistance, MyLatLng, TimestampedLatLng} from "../util/mapmath";
import {View} from "react-native";
import { Marker as MarkerInterface } from './custommarker';

let isTraveling = false;
let timestamps = [];

interface Props {
    styles: any;
    markers: MarkerInterface[];
    selectMarker: (marker: MarkerInterface, index: number) => void;
}

export default function Map({ styles, markers, selectMarker }: Props) {
    // Data for the user
    const [userLocation, setUserLocation] = useState<MyLatLng | null>(null);
    const [destination, setDestination] = useState<MyLatLng | null>(null);
    const [previousCameraZoom, setPreviousCameraZoom] = useState<number | undefined>(undefined);
    const [locations, setLocations] = useState<Array<TimestampedLatLng>>([]);
    const [heading, setHeading] = useState<number | null>(null);
    const mapRef = useRef<MapView>(null);

    function startTravel(destination: MyLatLng) {
        isTraveling = true;

        console.log("Starting!")
        setDestination(destination);
        if (userLocation)
            animate(userLocation, destination);
    }

    function stopTravel() {
        isTraveling = false;
        timestamps.length = 0;

        console.log("Stopping!")
        setDestination(null)
        if (mapRef.current && previousCameraZoom) {
            console.log("CJCrafter is stupid");
            mapRef.current.animateCamera({
                zoom: previousCameraZoom,
                center: {
                    latitude: userLocation?.latitude ?? 0,
                    longitude: userLocation?.longitude ?? 0,
                },
                pitch: 0,
                heading: 0,
            });
        }
    }

    async function animate(origin: MyLatLng, destination: MyLatLng) {
        if (!mapRef.current)
            return;

        // This gets the current camera properties
        mapRef.current.getCamera().then(camera => setPreviousCameraZoom(camera.zoom));

        let distanceInMiles = haversineDistance(origin, destination);
        mapRef.current.animateCamera({
            heading: calculateBearing(origin, destination),
            zoom: getZoomLevel(distanceInMiles),
            center: {
                latitude: (origin.latitude * 2 + destination.latitude) / 3,
                longitude: (origin.longitude * 2 + destination.longitude) / 3,
            },
            pitch: 45,
        });
    }

    // Request user permission to use location
    console.log("Google API Key: " + GOOGLE_MAPS_API_KEY);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isTraveling && userLocation) {
                const currentTimestamp = Math.floor(Date.now() / 1000); // Current UNIX timestamp in seconds
                const newEntry: TimestampedLatLng = {
                    ...userLocation,
                    unix: currentTimestamp
                };
                setLocations(prevLocations => {
                    console.log("prevLocations: " + JSON.stringify(prevLocations));
                    return [...prevLocations, newEntry]
                });
            }
        }, 10 * 1000);

        return () => clearInterval(intervalId); // Cleanup the interval when component is unmounted
    }, [userLocation]);

    useEffect(() => {
        let isMounted = true;

        const watch = async () => {
            await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            },
                (location) => {
                    const { latitude, longitude } = location.coords;
                    if (isMounted)
                        setUserLocation({ latitude, longitude });
                });
        };

        watch();

        return () => {
            isMounted = false; // Cleanup
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const watch = async () => {
            await Location.watchHeadingAsync(({ trueHeading }) => {
                if (isMounted) {
                    setHeading(trueHeading);
                }
            });
        };

        watch();

        return () => {
            isMounted = false; // Cleanup
        };
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
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    onPress={() => {
                        startTravel(marker.latlng);
                        selectMarker(marker, index);
                    }}
                >
                    <View style={{alignItems: 'center', justifyContent: 'center', position: 'relative',  width: 44, height: 58}}>
                        <Image source={{
                            uri: marker.icon,
                        }} style={{
                            width: 30,
                            height: 30,
                            position: 'relative',
                            borderRadius: 15,
                            top: -6
                        }}/> 
                        <Image source={{
                            uri: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/overlay.png",
                        }} style={{position: 'absolute', width: 50, height: 50,}}/>
                    </View>

                </Marker>
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
                        strokeColor={"#ddffdd"}
                    />
                </>
            )}
        </MapView>
    );
}
