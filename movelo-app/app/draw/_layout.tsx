import { Drawer } from "expo-router/drawer";


export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={
                {
                    headerShown: true,
                    swipeEnabled: false,
                    drawerStyle: {
                        backgroundColor: "#fff",
                    },
                    drawerActiveBackgroundColor: "#306844",
                    drawerActiveTintColor: "#fff",
                    headerTintColor: "black",
                }
            }
        >
            <Drawer.Screen name="settings" />
            <Drawer.Screen name="main" 
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="campaign" />
            <Drawer.Screen name="account" />
        </Drawer>
    )
}