import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={
                {
                    headerShown: true,
                }
            }
        >
            <Drawer.Screen name="settings" />
            <Drawer.Screen name="main" 
                options={{
                    headerShown: false,
                }}
            />
        </Drawer>
    )
}