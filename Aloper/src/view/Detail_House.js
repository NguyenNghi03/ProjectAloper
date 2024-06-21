import { View, Text, ScrollView, Image, Button, Pressable, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, Feather, MaterialIcons, FontAwesome6, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail_House({ route, navigation }) {
    const [detailroom1, setDetailRoom1] = useState([]);
    const { roomId } = route.params;

    useEffect(() => {
        console.log('Fetched rooms...');
        fetchDetailRooms(roomId);
    }, []);

    const fetchDetailRooms = async (roomId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is not available');
                return;
            }

            console.log('Token retrieved:', token);

            const response = await fetch(`http://14.225.254.188:8080/api/Rooms/get-room-details/${roomId}`, {
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
            setDetailRoom1(data);
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

            <View className="p-4 bg-white ">
                <FlatList
                    data={detailroom1}
                    renderItem={({ item }) => (
                        <View className=" mb-2 rounded-lg shadow">
                            <Image className="w-full h-96" source={{ uri: `http://14.225.254.188:8080/ImageRoom/${item.image}.jpg` }} />
                            <Text className="text-lg font-bold">{item.roomCode || "null"}</Text>
                            <Text className="text-lg font-bold">{item.roomId || "null"}</Text>
                            <Text className="text-lg font-bold">{item.rentPrice || "null"}</Text>
                            <Text className="text-lg font-bold">{item.status || "null"}</Text>
                            <Text className="text-lg font-bold">{item.floor || "null"}</Text>
                            <Text className="text-lg font-bold">{item.category || "null"}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}