import { View, Text, Button, TouchableOpacity} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthProvider";

async function deleteAddressAndPrivateKey() {
    await SecureStore.deleteItemAsync('address');
    await SecureStore.deleteItemAsync('private');
}

async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

export default function Settings() {
    const router = useRouter();
    const { user, setUser } = useAuth();
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View>
                <TouchableOpacity onPress={async () => {
                    deleteAddressAndPrivateKey();
                    console.log('deleted');
                    console.log(await getValueFor('address'));
                    console.log(await getValueFor('private'));
                    setUser(null);
                    
                }}>
                    <Text>logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                   async () => {
                        console.log(user);
                        console.log(user?.address);
                        console.log(user?.private);
                        console.log("STORAGE ===")
                        console.log(await getValueFor('address'));
                        console.log(await getValueFor('private'));
                        console.log("END STORAGE ===")
                    }
                }
                style={{marginTop: 20}}
                >
                    <Text>test values</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}