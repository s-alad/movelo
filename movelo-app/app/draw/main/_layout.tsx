import { Stack, Tabs, router } from 'expo-router';
import React from 'react';
import { Appearance, Platform, TouchableOpacity, useColorScheme, Text } from 'react-native';
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
                    title: "VeChain Leaderboard",
                    headerShown: true,
                    headerBlurEffect: "regular",
                    headerLeft: () => <TouchableOpacity onPress={() => router.back()}>
                        <Text>back</Text>
                    </TouchableOpacity>,
                }}
            />
        </Stack>
    )
}
