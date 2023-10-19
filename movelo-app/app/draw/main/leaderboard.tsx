import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image, ImageBase} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Leaderboard() {
    const leaderboardData = [
        { name: 'Phil', co2Saved: 100 },
        { name: 'Bob', co2Saved: 95 },
        { name: 'Alice', co2Saved: 90 },
        { name: 'Eva', co2Saved: 85 },
        { name: 'Mallory', co2Saved: 80 },
        { name: 'Trish', co2Saved: 75 },
        { name: 'Carol', co2Saved: 70 },
        { name: 'David', co2Saved: 65 },
        { name: 'Oscar', co2Saved: 60 },
        { name: 'Michael', co2Saved: 55 },
        { name: 'Rob', co2Saved: 50 },
        { name: 'Alica', co2Saved: 45 },
        { name: 'Eve', co2Saved: 40 },
        { name: 'Mell', co2Saved: 35 },
        { name: 'Trent', co2Saved: 30 },
        { name: 'Connie', co2Saved: 25 },
        { name: 'Dave', co2Saved: 20 },
        { name: 'Mario', co2Saved: 15 },
        { name: 'Phillip', co2Saved: 10 },
        { name: 'Bobbie', co2Saved: 5 },
        { name: 'Collin', co2Saved: 5 },
        { name: 'Eevee', co2Saved: 5 },
        { name: 'Fiona', co2Saved: 5 },
        { name: 'Trinity', co2Saved: 5 },
        { name: 'Bill', co2Saved: 5 },
        { name: 'Wes', co2Saved: 5 },
        { name: 'Philly', co2Saved: 5 },
        { name: 'Bobby', co2Saved: 5 },
        { name: 'Alicia', co2Saved: 5 },
        { name: 'Christina', co2Saved: 5 },
        { name: 'Trip', co2Saved: 5 },
        { name: 'Chris', co2Saved: 5 },
        { name: 'Dylan', co2Saved: 5 },
    ];

    return (
        <View style={styles.container}>
            <Image source={require('../../../dummy_data/vechain.png')} style={styles.image} />
            <View style={styles.podiumContainer}>
                <LinearGradient colors={['#C0C0C0', '#F8F8F8']} style={styles.secondPlace}>
                    <Text style={styles.placeText}>2nd</Text>
                    <Text style={styles.smallName}>{leaderboardData[1].name}</Text>
                </LinearGradient>
                <LinearGradient colors={['#FFD700', '#FFF8DC']} style={styles.firstPlace}>
                    <Text style={styles.placeText}>1st</Text>
                    <Text style={styles.smallName}>{leaderboardData[0].name}</Text>
                </LinearGradient>
                <LinearGradient colors={['#CD7F32', '#FFEBD7']} style={styles.thirdPlace}>
                    <Text style={styles.placeText}>3rd</Text>
                    <Text style={styles.smallName}>{leaderboardData[2].name}</Text>
                </LinearGradient>
            </View>
            <ScrollView style={styles.listContainer}>
                {leaderboardData.map((player, index) => (
                    <View key={player.name} style={styles.row}>
                        <Text style={styles.position}>{index + 1}</Text>
                        <Text style={styles.name}>{player.name}</Text>
                        <Text style={styles.co2}>{player.co2Saved}lbs of CO₂</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
/*         paddingTop: 40 */
    },
    image: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    podiumContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        height: 120,
        alignItems: 'flex-end',
        marginTop: 20,
    },
    firstPlace: {
        width: '30%', // Set the width to 30%
        marginHorizontal: '1.5%', // Adds spacing between blocks
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#DAA520',
        height: 120
    },
    secondPlace: {
        width: '30%', // Set the width to 30%
        marginHorizontal: '1.5%', // Adds spacing between blocks
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#B0B0B0',
        height: 100,
    },
    thirdPlace: {
        width: '30%', // Set the width to 30%
        marginHorizontal: '1.5%', // Adds spacing between blocks
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#A0522D',
        height: 80,
    },
    placeText: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    smallName: {
        fontSize: 14
    },
    listContainer: {
        width: '90%',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#e1e1e1'
    },
    position: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 30,
        textAlign: 'center'
    },
    name: {
        fontSize: 18,
        flex: 1
    },
    co2: {
        fontSize: 14,
        color: 'green'
    }
});