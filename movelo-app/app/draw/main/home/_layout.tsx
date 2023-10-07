import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function TabsLayout() {
    const navigation: any = useNavigation();
    return (
        <View
            style={{
                flex: 1,
                display: "flex",
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 50,
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
                    top: 50,
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

            <Tabs
                initialRouteName="move"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#425c5a",
                        height: 60,
                        borderRadius: 8,
                    },
                    tabBarIconStyle: {
                        color: "#fff",
                    },
                    tabBarActiveTintColor: "#fff",
                }}
            >
                <Tabs.Screen
                    name="move"
                    options={{
                        href: {
                            pathname: "/draw/main/home/move",
                        },
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 18,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <TabBarIcon name="map" color={color} size={18} />
                                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5, color: color }}>
                                    Moves
                                </Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="feed"
                    options={{
                        title: "",
                        headerShown: true,
                        href: {
                            pathname: "/draw/main/home/feed",
                        },
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 18,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <TabBarIcon name="feed" color={color} size={18} />
                                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5, color: color }}>
                                    Feed
                                </Text>
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
}) {
    return (
        <FontAwesome
            size={props.size || 26}
            style={{ marginBottom: -3 }}
            {...props}
        />
    );
}