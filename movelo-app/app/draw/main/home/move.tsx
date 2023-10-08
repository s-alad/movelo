import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Map from '../../../../components/map';
import { Marker as MarkerInterface } from '../../../../components/custommarker';
import * as Location from 'expo-location';
import { haversineDistance, MyLatLng } from "../../../../util/mapmath";

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
        },
        button: {
            backgroundColor: '#3498db', // Change this to your primary color
            paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 25,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
        },
        buttonText: {
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
        },
        testButton: {
            backgroundColor: '#e74c3c', // Change this to your secondary or warning color
        },
    });

    const DATA = [
        {
            title: 'Your Movelos',
            data: [
                {
                    title: "redhat",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.15,
                    latlng: {
                        latitude: 42.348518,
                        longitude: -71.049611,
                    },
                    icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/redhat_logo_icon_168023.png"
                },
                {
                    title: "Engineer",
                    description: "Build with duct tape",
                    vechain_reward_to_mile: 0.04,
                    latlng: {
                        latitude: 42.363105,
                        longitude: -71.126159
                    },
                    icon: "https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/348554/348554_o51_et_8573995/348554"
                }
            ],
        },
        {
            title: 'Promoted Movelos',
            data: [
                {
                    title: "GSU",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.21,
                    latlng: {
                        latitude: 42.350635,
                        longitude: -71.109000,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                },
                {
                    title: "Marcianos",
                    vechain_reward_to_mile: 0.19,
                    description: "Buy food n' stuff",
                    latlng: {
                        latitude: 42.350046,
                        longitude: -71.097864,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                }
            ]
        },
        {
            title: 'Nearby Movelos',
            data: /* ['Dominoes', 'Papa Johns', 'Pizza Hut', "McDonalds"], */[
                {
                    title: "Dominoes",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.07,
                    latlng: {
                        latitude: 42.369508,
                        longitude: -71.111382,
                    },
                    icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
                },
                {
                    title: "McDonalds",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 0.05,
                    latlng: {
                        latitude: 42.362723,
                        longitude: -71.136918,
                    },
                    icon: "https://seeklogo.com/images/M/mcdonald-s-logo-2325D6C1EF-seeklogo.com.png"
                },
                {
                    title: "Trader Joes",
                    description: "Buy food n' stuff",
                    vechain_reward_to_mile: 42.363384,
                    latlng: {
                        latitude: 42.363384,
                        longitude: -71.129581
                    },icon: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/trader_joes.png"
                }
            ]
        },
    ];

    let pointsOfInterest: MarkerInterface[] = DATA.map((section) => {
        return section.data.map((marker) => {
            return {
                title: marker.title,
                description: marker.description,
                latlng: {
                    latitude: marker.latlng.latitude,
                    longitude: marker.latlng.longitude,
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

    const [location, setLocation] = useState<MyLatLng | null>(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    if (location !== null && destination !== null) {
        let distance = haversineDistance(location, destination);
        if (distance < 0.05) {
            alert("you did it")
            setCurrentMarker(null);
            setDestination(null);
        }
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
                destination={destination} selectDestination={setDestination} />

            {
                (location !== null && destination !== null) ?
                    <BottomSheet
                        index={1}
                        snapPoints={[70, 71]}
                        backgroundComponent={({ style }) => (
                            <View style={[style, { backgroundColor: '#ffffff', borderRadius: 12, }]} />
                        )}
                        style={{ width: '100%', paddingLeft: 24, paddingRight: 24, display: 'flex', justifyContent: 'center' }}
                        handleComponent={() => (<View></View>)}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 26,
                                    fontWeight: 'bold',
                                }}
                            >{Math.round(haversineDistance(location, destination) * 10) / 10 + " miles"}</Text>

                            <TouchableOpacity onPress={() => {
                                setDestination(null);
                                setCurrentMarker(null);
                            }} style={[styles.button, styles.testButton, {margin: 0, top: 10}]}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheet>

                    : currentMarker !== null ?
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
                            }} style={{ width: 10, marginBottom: 12 }}>
                                <View style={{ display: 'flex', width: 200, flexDirection: 'row', alignItems: 'center' }}><FontAwesome
                                    size={26}
                                    style={{ marginBottom: -3, marginRight: 12 }}
                                    name="long-arrow-left"
                                />
                                    {/* <Text>back</Text> */}</View>
                            </TouchableOpacity>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ flexDirection: 'column', width: '60%' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        Distance: {
                                            location !== null ?
                                                haversineDistance(
                                                    location!,
                                                    currentMarker!.latlng
                                                ).toFixed(2) + "mi away"
                                                : ""
                                        }
                                    </Text>

                                    <Text>
                                        VET reward:
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'column', width: '40%', height: 60 }}>
                                    <TouchableOpacity onPress={() => {
                                        setDestination(currentMarker!.latlng);
                                    }} style={{ width: '100%' }}>
                                        <View style={{ borderRadius: 16, padding: 8, backgroundColor: '#306844', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{
                                                fontSize: 24,
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            }}>Start</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </BottomSheet>
                        :
                        <BottomSheet
                            index={1}
                            snapPoints={[58, 250, 650]}
                            backgroundComponent={({ style }) => (
                                <View style={[style, { backgroundColor: '#ffffff', borderRadius: 12, }]} />
                            )}
                        >
                            <BottomSheetSectionList
                                sections={DATA}
                                keyExtractor={(item, index) => item.title + index}
                                renderItem={({ item, index, section }) => (

                                    <View style={{
                                        marginBottom: index === section.data.length - 1 ? 24 : 8,
                                        flexDirection: 'row',
                                    }}
                                    >
                                        <View style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCurrentMarker(item);
                                                }}
                                            >
                                                <View style={{ borderRadius: 6, padding: 8, backgroundColor: '#306844', width: 130, }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        color: 'white',
                                                        textAlign: 'center'
                                                    }}>{item.title}</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <View style={{marginLeft: 10}}>
                                                <Text>{
                                                    location !== null ?
                                                    haversineDistance(
                                                        location!,
                                                        item.latlng
                                                    ).toFixed(2) + "mi away"
                                                    : ""
                                                    }</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 8 }}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: 'black',
                                            }}>{item.vechain_reward_to_mile} VET</Text>
                                        </View>
                                    </View>

                                )}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Text style={{ fontSize: 24, backgroundColor: 'white', marginBottom: 6 }}>{title}</Text>
                                )}
                                style={{ width: '100%', paddingLeft: 24, paddingRight: 24, }}
                            />
                        </BottomSheet>
            }
        </View>
    );

}
