import { Stack, Tabs, router } from 'expo-router';
import React from 'react';
import {Appearance, Platform, TouchableOpacity, useColorScheme, Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RootLayout() {

    return (
        <Stack
        >
            <Stack.Screen
                name="home"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="leaderboard"
                options={{
                    title: "VeChain's Company Leaderboard",
                    headerShown: true,
                    headerBlurEffect: "regular",
                    headerLeft: () => <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require("../../../assets/back.png")} style={{
                            width: 24,
                            height: 24,
                        }}/>
                    </TouchableOpacity>,
                }}
            />
        </Stack>
    )
}
