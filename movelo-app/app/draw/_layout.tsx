import { Drawer } from "expo-router/drawer";


export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={
                {
                    headerShown: true,
                    swipeEnabled: false,
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
        </Drawer>
    )
}