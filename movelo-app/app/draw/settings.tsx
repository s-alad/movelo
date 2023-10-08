import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as SecureStore from 'expo-secure-store';
import {useRouter} from "expo-router";
import {useAuth} from "../../context/AuthProvider";

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
    const {user, setUser} = useAuth();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styles.testButton, ]} onPress={async () => {
                deleteAddressAndPrivateKey();
                console.log('deleted');
                console.log(await getValueFor('address'));
                console.log(await getValueFor('private'));
                setUser(null);
            }}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={async () => {
                console.log(user);
                console.log(user?.address);
                console.log(user?.private);
                console.log("STORAGE ===")
                console.log(await getValueFor('address'));
                console.log(await getValueFor('private'));
                console.log("END STORAGE ===")
            }}>
                <Text style={styles.buttonText}>Test Values</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#3498db', // Change this to your primary color
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    testButton: {
        backgroundColor: '#e74c3c', // Change this to your secondary or warning color
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
});
