import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Leaderboard() {
    const leaderboardData = [
        { name: 'Phil', co2Saved: 100 },
        { name: 'Bob', co2Saved: 95 },
        { name: 'Alice', co2Saved: 90 },
        { name: 'Eve', co2Saved: 85 },
        { name: 'Mallory', co2Saved: 80 },
        { name: 'Trent', co2Saved: 75 },
        { name: 'Carol', co2Saved: 70 },
        { name: 'Dave', co2Saved: 65 },
        { name: 'Oscar', co2Saved: 60 },
        { name: 'Phil', co2Saved: 55 },
        { name: 'Bob', co2Saved: 50 },
        { name: 'Alice', co2Saved: 45 },
        { name: 'Eve', co2Saved: 40 },
        { name: 'Mallory', co2Saved: 35 },
        { name: 'Trent', co2Saved: 30 },
        { name: 'Carol', co2Saved: 25 },
        { name: 'Dave', co2Saved: 20 },
        { name: 'Oscar', co2Saved: 15 },
        { name: 'Phillip', co2Saved: 10 },
        { name: 'Bob', co2Saved: 5 },
        { name: 'Alice', co2Saved: 5 },
        { name: 'Eve', co2Saved: 5 },
        { name: 'Mallory', co2Saved: 5 },
        { name: 'Trent', co2Saved: 5 },
        { name: 'Carol', co2Saved: 5 },
        { name: 'Dave', co2Saved: 5 },
        { name: 'Oscar', co2Saved: 5 },
        { name: 'Phil', co2Saved: 5 },
        { name: 'Bob', co2Saved: 5 },
        { name: 'Alice', co2Saved: 5 },
        { name: 'Eve', co2Saved: 5 },
        { name: 'Mallory', co2Saved: 5 },
        { name: 'Trent', co2Saved: 5 },
        { name: 'Carol', co2Saved: 5 },
        { name: 'Dave', co2Saved: 5 },
    ];

    return (
        <View style={styles.container}>
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
                        <Text style={styles.co2}>Saved {player.co2Saved} pounds of CO2</Text>
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
        paddingTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    podiumContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        height: 120
    },
    firstPlace: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#DAA520'
    },
    secondPlace: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#B0B0B0'
    },
    thirdPlace: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#A0522D'
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