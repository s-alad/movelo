import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


function formatTime(date: Date) {
    return new Intl.DateTimeFormat('default', { hour: '2-digit', minute: '2-digit' }).format(date);
}

function generateDummy(id: number) {
    let names = ["Collin", "Ryan", "Lauren", "Aditya", "Samantha", "Emma", "Tess", "Christina"]
    let companies = ["Google", "Facebook", "Amazon", "Microsoft", "Apple", "Tesla", "IBM"]

    let name = names[Math.floor(Math.random() * names.length)];
    let company = companies[Math.floor(Math.random() * companies.length)];

    return {
        id: id,
        text: `${name} completed a compaign with ${company}!`,
        timestamp: formatTime(new Date()),
    };
}

export default function Feed() {
    // Mock data for chat messages
    const [messages, setMessages] = useState(() => {
        let arr = [];
        for (let i = 0; i < 20; i++) {
            arr.push(generateDummy(i));
        }
        return arr;
    });

    /*
    useEffect(() => {
        // For demonstration purposes, let's add a new message every 10 seconds
        const interval = setInterval(() => {
            const newMessage = {
                id: messages.length + 1,
                text: `This is message number ${messages.length + 1}`,
                timestamp: formatTime(new Date()),
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }, 10000);

        return () => clearInterval(interval);
    }, [messages]);
    */

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: 'white',
                height: 0,
            }} />
{/*             <LinearGradient
                colors={['rgb(255, 255, 255)', 'transparent']}
                style={styles.gradient}
            /> */}
            <ScrollView style={styles.messagesContainer}>

                {messages.map((message) => (
                    <View key={message.id} style={styles.messageBox}>
                        <Text>{message.text}</Text>
                        <Text style={styles.timestamp}>{message.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 100, // Adjust this value as necessary
        zIndex: 1, // Ensure the gradient is above the messages
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    messageContentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageBox: {
        backgroundColor: '#f1f1f1',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    timestamp: {
        marginTop: 10,
        color: 'green',
        fontSize: 12,
    },
    input: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});
