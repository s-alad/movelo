import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import BottomSheet, {BottomSheetSectionList} from "@gorhom/bottom-sheet";
import renderMap from "./map";
import React, {useEffect, useState} from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyles from '../../../../dummy_data/mapStyles.json';
import mapMarkers from '../../../../dummy_data/dummyMarkers.json';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

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
        header: {
            fontSize: 24,
        },
        title: {
            fontSize: 18,
        },
        map: {
            width: '100%',
            height: '100%',
        }
    });

    const DATA = [
        {
            title: 'Your Moves',
            data: ['Red Hat', "Mozilla"],
        },
        {
            title: 'Promoted Movelos',
            data: ['Tattes Harvard', 'GSU', 'Marcianos'],
        },
        {
            title: 'Online Movelos',
            data: ['Dominoes', 'Papa Johns', 'Pizza Hut', "McDonalds"],
        },
    ];

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

            {renderMap(styles)}

            <BottomSheet
                index={1}
                snapPoints={[150, 550]}
                backgroundComponent={({ style }) => (
                    <View style={[style, { backgroundColor: '#ffffff', borderRadius: 8, }]} />
                )}
            >
                <BottomSheetSectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index, section }) => (
                        <View style={{ marginBottom: index === section.data.length - 1 ? 24 : 0 }}>
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
