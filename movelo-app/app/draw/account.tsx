import { View, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
export default function Account() {

    async function getValueFor(key: string) {
        let result = await SecureStore.getItemAsync(key);
        return result;
    }

    let [addy, setAddy] = useState<string | null>(null);

    useEffect(() => {
        getValueFor('address').then((res) => {
            setAddy(res);
        })
    }, [])


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    height: 100,
                    width: '90%',
                    borderRadius: 12,
                    backgroundColor: '#306844',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >Account Address</Text>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 8,
                    }}
                >{addy}</Text>
            </View>
            <View
                style={{
                    height: 100,
                    width: '90%',
                    borderRadius: 12,
                    backgroundColor: '#306844',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >Balance</Text>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 8,
                    }}
                >15.5 VET</Text>
            </View>
        </View>
    )
}