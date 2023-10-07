import { Stack, Tabs, router } from 'expo-router';
import React from 'react';
import { AuthProvider } from "../context/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import { Appearance, Platform, TouchableOpacity, useColorScheme, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          
          <Stack
            
          > 
            <Stack.Screen
              name="draw"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="leaderboard"
              options={{
                title: "leaderboard",
                headerShown: true,
                headerBlurEffect: "regular",
                headerLeft: () => <TouchableOpacity onPress={() => router.back()}>
                <Text>back</Text>
            </TouchableOpacity>,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
