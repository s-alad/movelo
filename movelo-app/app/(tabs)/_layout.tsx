import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';

export default function TabsLayout() {
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
                    right: 0,
                    height: 50,
                    width: 50,
                    zIndex: 100,
                    backgroundColor: 'red',
                }}

                
            >
                <Text>Menu</Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    right: 25,
                    height: 50,
                    width: 50,
                    zIndex: 100,
                    backgroundColor: 'yellow',
                }}
            >
                <TouchableOpacity onPress={() => router.push('/leaderboard')}>
                    <Text>Leader</Text>
                </TouchableOpacity>
            </View>
            <Tabs
                initialRouteName="home"
                screenOptions={{
                    tabBarStyle:
                        Platform.OS === "ios"
                        && {
                            backgroundColor: "transparent",
                        },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        href: "/home",
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 17,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <TabBarIcon name="map" color={color} size={24} />
                                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                                    Moves
                                </Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="other"
                    options={{
                        title: "",
                        headerShown: true,
                        href: {
                            pathname: "/other",
                        },
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 17,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <TabBarIcon name="map" color={color} size={24} />
                                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                                    Other
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