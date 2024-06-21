import { View, Text, ScrollView, Image, Button, Pressable, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, Feather, MaterialIcons, FontAwesome6, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List_House({ navigation }) {
    const [detailroom, setDetailRoom] = useState([]);

    useEffect(() => {
        console.log('Fetched rooms...');

        fetchDetailRooms();
    }, []);

    const fetchDetailRooms = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is not available');
                return;
            }

            console.log('Token retrieved:', token);

            const response = await fetch("http://14.225.254.188:8080/api/Rooms/get-rooms-of-house/1", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`HTTP error! status: ${response.status}`, responseBody);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched rooms data:', data);
            setDetailRoom(data);
        } catch (error) {
            console.error('Error details:', error);
            if (error instanceof Error) {
                if (error.message.includes('403')) {
                    console.error('Unauthorized access. Please check your token.');
                } else {
                    console.error(`Error: ${error.message}`);
                }
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };


    return (

        <View>
            <View className="flex-col ml-3 mt-16">
                <Pressable onPress={() => navigation.goBack()}><Ionicons name="return-down-back" size={32} color="black" /></Pressable>
            </View>

            <View className="p-4 bg-white mb-2 rounded-lg shadow">
                <FlatList
                    data={detailroom}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => { navigation.navigate("Detail_House", { roomId: item.id }) }} className="p-4 bg-white mb-2 rounded-lg shadow">
                            <Text className="text-lg font-bold">{item.roomCode || "null"}</Text>
                            <Text className="text-lg font-bold">{item.houseId || "null"}</Text>
                            <Text className="text-lg font-bold">{item.id || "null"}</Text>
                            <Text className="text-lg font-bold">{item.rentPrice || "null"}</Text>
                            <Text className="text-lg font-bold">{item.status || "null"}</Text>
                            <Text className="text-lg font-bold">{item.floor || "null"}</Text>
                            <Text className="text-lg font-bold">{item.category || "null"}</Text>
                        </Pressable>
                    )}
                    ListHeaderComponent={() => (
                        <View className="h-50" />
                    )}
                    ListFooterComponent={() => (
                        <View className="h-50" />
                    )}
                />


            </View>
        </View>
    )
}