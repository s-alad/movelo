import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import BottomSheet, {BottomSheetSectionList} from "@gorhom/bottom-sheet";
import React, {useEffect, useState} from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyles from '../../../../dummy_data/mapStyles.json';
import mapMarkers from '../../../../dummy_data/dummyMarkers.json';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

export default function App() {

    let colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
            alignItems: 'center',
            justifyContent: 'center',
        },
        item: {
            padding: 2,
        },
        header: {
            fontSize: 32,

        },
        title: {
            fontSize: 24,
        },
        map: {
            width: '100%',
            height: '100%',
        }
    });

    const DATA = [
        {
            title: 'Promoted Movelos',
            data: ['Tattes Harvard', 'GSU', 'Marcianos'],
        },
        {
            title: 'Online Movelos',
            data: ['Dominoes', 'Papa Johns', 'Pizza Hut', "McDonalds"],
        },
    ];

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

    type Location = {
        latitude: number;
        longitude: number;
    } | null;
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


    return (

        <View
            style={styles.container}
        >
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
                {userLocation && mapMarkers.length > 0 && (
                    <MapViewDirections
                        origin={userLocation}
                        destination={mapMarkers[0].latlng}
                        apikey={GOOGLE_MAPS_API_KEY}  // Ensure this is the correct name for your API key variable
                        strokeWidth={6}
                        strokeColor="white"
                    />
                )}

            </MapView>


            <BottomSheet
                index={1}
                snapPoints={[150, 300, 550]}
                backgroundComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'grey' }]} />
                )}
            >
                <BottomSheetSectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index, section }) => (
                        <View style={[styles.item,
                        { marginBottom: index === section.data.length - 1 ? 24 : 0 }
                        ]}>
                            <Text style={styles.title}>{item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    style={{ width: '100%', paddingLeft: 24, paddingRight: 24 }}
                />
            </BottomSheet>
        </View>
    );

}
