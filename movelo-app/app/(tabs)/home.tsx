import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import { Appearance, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyles from './mapStyles.json';


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
            />


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
