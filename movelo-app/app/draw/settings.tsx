import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import * as SecureStore from 'expo-secure-store';
import {useRouter} from "expo-router";
import {useAuth} from "../../context/AuthProvider";
import {useState} from "react";

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

    // Campaign input fields
    const [company, setCompany] = useState('Harvard');
    const [description, setDescription] = useState('Learn something probably');
    const [latitude, setLatitude] = useState('42.374368');
    const [longitude, setLongitude] = useState('-71.116684');
    const [rate, setRate] = useState('0.1');
    const [image, setImage] = useState('https://1000logos.net/wp-content/uploads/2017/02/Harvard-symbol.jpg');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, styles.testButton]} onPress={async () => {
                    deleteAddressAndPrivateKey();
                    console.log('deleted');
                    console.log(await getValueFor('address'));
                    console.log(await getValueFor('private'));
                    setUser(null);
                }}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]} onPress={async () => {
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
                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={company}
                        onChangeText={setCompany}
                        placeholder="Company"
                    />
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description"
                    />
                    <TextInput
                        style={styles.input}
                        value={latitude}
                        onChangeText={setLatitude}
                        placeholder="Latitude"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={longitude}
                        onChangeText={setLongitude}
                        placeholder="Longitude"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={rate}
                        onChangeText={setRate}
                        placeholder="Rate"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={image}
                        onChangeText={setImage}
                        placeholder="Image"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={async () => {
                    console.log("Creating campaign...")
                }}>
                    <Text style={styles.buttonText}>Create Campaign</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
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
        borderRadius: 25,
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
