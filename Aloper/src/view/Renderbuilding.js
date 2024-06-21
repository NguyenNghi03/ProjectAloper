import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RenderBuilding({ navigation }) {
    const [houses, setHouses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        console.log('Fetching houses...');
        refreshToken();
        fetchHouses();
    }, []);

    async function refreshToken() {
        try {
            const refreshToken = await AsyncStorage.getItem('token');
            if (!refreshToken) {
                console.error('Refresh token is not available');
                return null;
            }

            const response = await fetch('http://14.225.254.188:8080/api/Accounts/refresh-token', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return null;
        }
    }

    const fetchHouses = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is not available');
                return;
            }

            const response = await fetch('http://14.225.254.188:8080/api/Houses/get-all-houses-for-user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setHouses(data);
            console.log('Fetched houses:', data);
        } catch (error) {
            if (error instanceof Error && error.message.includes('403')) {
                console.error('Unauthorized access. Please check your token.');
            } else {
                console.error('An unexpected error occurred.');
            }
        }
    };

    const filteredHouses = houses.filter(house =>
        house.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ImageBackground className="w-full h-screen" source={require("../img/Background.png")}>
            <View className="flex-col ml-3 mt-16">
                <Pressable onPress={() => navigation.goBack()}><Ionicons name="return-down-back" size={32} color="white" /></Pressable>
                <Text className="text-white text-3xl font-bold ml-1 mt-4">Khám phá</Text>
            </View>


            <View className="absolute bottom-0 left-0 w-full h-3/4 bg-slate-50">
                <View className="items-center -mt-8 shadow-lg">
                    <View className="items-center justify-center w-11/12 border-white border-2 rounded-2xl h-14 text-1.5xl p-3 bg-white flex-row">
                        <TextInput
                            className="-ml-64 w-9/12 text-xl"
                            placeholder='Tìm kiếm'
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <View className="-ml-72 items-center">
                            <Feather name="search" size={33} color="#A0AEC0" />
                        </View>
                    </View>
                   
                </View>






                <FlatList
                    data={filteredHouses}
                    renderItem={({ item }) => (
                        <View className= "p-4 bg-white mb-2 rounded-lg shadow mt-2">
                            <Text className= "text-lg font-bold">{item.name}</Text>
                            <Text className="text-base text-gray-500" >{item.address}</Text>
                            <Text className="text-base text-green-500 mt-1" >Số lượng phòng: {item.quantityRoom}</Text>
                
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <View className="h-50" />
                    )}
                    ListFooterComponent={() => (
                        <View className= "h-50" />
                    )}
                />
            </View>
        </ImageBackground>
    );
}
