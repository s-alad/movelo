import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

export default function Feed() {
    // Mock data for chat messages
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello there!', timestamp: '9:15 AM' },
        { id: 2, text: 'General Kenobi!', timestamp: '9:16 AM' },
    ]);

    useEffect(() => {
        // For demonstration purposes, let's add a new message every 10 seconds
        const interval = setInterval(() => {
            const newMessage = {
                id: messages.length + 1,
                text: `This is message number ${messages.length + 1}`,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }, 10000);

        return () => clearInterval(interval);
    }, [messages]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message) => (
                    <View key={message.id} style={styles.messageBox}>
                        <Text>{message.text}</Text>
                        <Text style={styles.timestamp}>{message.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
            <TextInput
                multiline
                numberOfLines={4}
                placeholder="Type your message..."
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
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
