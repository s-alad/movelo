import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyles from '../../../../dummy_data/mapStyles.json';
import mapMarkers from '../../../../dummy_data/dummyMarkers.json';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location'; import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Map from '../../../../components/map';
import CustomMarker from '../../../../components/custommarker';
import { Marker as MarkerInterface } from '../../../../components/custommarker';
import { MyLatLng } from 'util/mapmath';

export default function App() {
    const navigation: any = useNavigation();
    let colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
            alignItems: 'center',
            justifyContent: 'center',
        },
        map: {
            width: '100%',
            height: '100%',
        }
    });

    const DATA = [
        {
            title: 'Your Movelos',
            data: [
                {
                    entity: "redhat",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.1,
                    location: {
                        latitude: 42.371433,
                        longitude: -72.903,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/trader_joes.png"
                },
                {
                    entity: "github",
                    description: "code all dat",
                    vechain_reward_to_mile: 0.1,
                    location: {
                        latitude: 42.171433,
                        longitude: -71.128903,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                }
            ],
        },
        {
            title: 'Promoted Movelos',
            data: [
                {
                    entity: "GSU",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.1,
                    location: {
                        latitude: 42.371433,
                        longitude: -71.128903,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                },
                {
                    entity: "Marcianos",
                    vechain_reward_to_mile: 0.1,
                    description: "Buy food n' stuff",
                    location: {
                        latitude: 42.371433,
                        longitude: -71.128903,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                }
            ]
        },
        {
            title: 'Nearby Movelos',
            data: /* ['Dominoes', 'Papa Johns', 'Pizza Hut', "McDonalds"], */[
                {
                    entity: "Dominoes",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.1,
                    location: {
                        latitude: 42.9714333,
                        longitude: -71.128903,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                },
                {
                    entity: "McDonalds",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.1,
                    location: {
                        latitude: 42.371433,
                        longitude: -71.128903,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                }
            ]
        },
    ];

    let pointsOfInterest: MarkerInterface[] = DATA.map((section) => {
        return section.data.map((marker) => {
            return {
                title: marker.entity,
                description: marker.description,
                latlng: {
                    latitude: marker.location.latitude,
                    longitude: marker.location.longitude,
                },
                icon: marker.icon,
            }
        })
    }).flat();


    const [destination, setDestination] = useState<MyLatLng | null>(null);
    let [currentMarker, setCurrentMarker] = useState<MarkerInterface | null>(null);
    function handleMarkerChange(marker: MarkerInterface, index: number) {
        setCurrentMarker(marker);
        console.log(marker)
    }

    return (

        <View
            style={styles.container}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 65,
                    left: 25,
                    padding: 8,
                    borderRadius: 8,
                    zIndex: 100,
                    backgroundColor: 'white',
                }}
            >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <FontAwesome
                        size={26}
                        style={{ marginBottom: -3 }}
                        name="bars"
                    />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: 'absolute',
                    top: 65,
                    right: 25,
                    padding: 8,
                    borderRadius: 8,
                    zIndex: 100,
                    backgroundColor: 'white',
                }}
            >
                <TouchableOpacity onPress={() => router.push('/draw/main/leaderboard')}>
                    <FontAwesome
                        size={26}
                        style={{ marginBottom: -3 }}
                        name="trophy"
                    />
                </TouchableOpacity>
            </View>

            <Map 
                styles={styles}
                markers={pointsOfInterest} selectMarker={handleMarkerChange} 
                destination={destination} selectDestination={setDestination}/>

            {
                currentMarker !== null ?
                    <BottomSheet
                        index={1}
                        snapPoints={[250, 251]}
                        backgroundComponent={({ style }) => (
                            <View style={[style, { backgroundColor: '#ffffff', borderRadius: 12, }]} />
                        )}
                        style={{ width: '100%', paddingLeft: 24, paddingRight: 24, paddingTop: 14, display: 'flex' }}
                        handleComponent={() => (<View></View>)}
                    >
                        <TouchableOpacity onPress={() => {
                            setCurrentMarker(null);
                            setDestination(null);
                        }} style={{width: 10, marginBottom: 12}}>
                            <View style={{display:'flex', width: 200, flexDirection: 'row', alignItems: 'center'}}><FontAwesome
                                size={26}
                                style={{ marginBottom: -3, marginRight: 12 }}
                                name="long-arrow-left"
                            />
                            {/* <Text>back</Text> */}</View>
                        </TouchableOpacity>
                        <View style={{display: 'flex', flexDirection: 'row'}}>

                            <View style={{flexDirection: 'column', width: '60%'}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <View /* style={{ borderRadius: 6, padding: 8, }} */>
                                        <Text style={{
                                            fontSize: 24,
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}>{currentMarker.title}</Text>
                                    </View>
                                </View>

                                <Text>
                                    {currentMarker.description}
                                </Text>

                                <Text>
                                    Distance: 0.5 miles
                                </Text>

                                <Text>
                                    VET reward: 0.1 VET
                                </Text>
                            </View>

                            <View style={{flexDirection: 'column', width: '40%', height: 60}}>
                                <TouchableOpacity style={{width: '100%', display: 'flex', flex: 1}}>
                                    <View style={{ borderRadius: 16, padding: 8, backgroundColor: '#306844', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{
                                            fontSize: 24,
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}>start</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </BottomSheet>
                    :
                    <BottomSheet
                        index={1}
                        snapPoints={[50, 250, 650]}
                        backgroundComponent={({ style }) => (
                            <View style={[style, { backgroundColor: '#ffffff', borderRadius: 12, }]} />
                        )}
                    >
                        <BottomSheetSectionList
                            sections={DATA}
                            keyExtractor={(item, index) => item.entity + index}
                            renderItem={({ item, index, section }) => (

                                <View style={{
                                    marginBottom: index === section.data.length - 1 ? 24 : 8,
                                    flexDirection: 'row',
                                }}
                                >
                                    <View style={{ borderRadius: 6, padding: 8, backgroundColor: '#306844' }}>
                                        <Text style={{
                                            fontSize: 17,
                                            color: 'white',
                                        }}>{item.entity}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 8 }}>
                                        <Text style={{
                                            fontSize: 17,
                                            color: 'black',
                                        }}>{item.vechain_reward_to_mile} VET</Text>
                                    </View>
                                </View>

                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={{ fontSize: 24, backgroundColor: 'white' }}>{title}</Text>
                            )}
                            style={{ width: '100%', paddingLeft: 24, paddingRight: 24 }}
                        />
                    </BottomSheet>
            }
        </View>
    );

}
