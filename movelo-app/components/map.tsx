import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyles from "../dummy_data/mapStyles.json";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import {GOOGLE_MAPS_API_KEY} from "@env";
import {calculateBearing, MyLatLng, TimestampedLatLng} from "../util/mapmath";
import {View} from "react-native";
import CustomMarker, { markers } from './custommarker';

let isTraveling = false;
let timestamps = [];

interface Props {
    styles: any;
}

export default function Map({styles}: Props) {
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

        mapRef.current.getCamera().then(camera => setPreviousCameraZoom(camera.zoom));
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
                    const {latitude, longitude} = location.coords;
                    if (isMounted)
                        setUserLocation({latitude, longitude});
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
            await Location.watchHeadingAsync(({trueHeading}) => {
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
            showsUserLocation={false}
            showsCompass={false}
            showsMyLocationButton={false}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    onPress={() => startTravel(marker.latlng)}
                >

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

            {userLocation &&
                <Marker coordinate={userLocation}>
                    <View style={{...styles.userLocationDot, transform: [{rotate: `${heading}deg`}]}}>
                        <View style={styles.pulse}></View>
                        <View style={styles.arrow}></View>
                    </View>
                </Marker>
            }
        </MapView>
    );
}
