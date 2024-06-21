import { View, Text, ScrollView, Image, Button, Pressable, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, Feather, MaterialIcons, FontAwesome6, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [user, setUser] = useState([]);
    const [room, setRoom] = useState([]);


    useEffect(() => {
        console.log('Fetched rooms...');
        fetchProfile();
        fetchRooms();
    }, []);
    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is not available');
                return;
            }

            const response = await fetch('http://14.225.254.188:8080/api/Accounts/get-profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data.response);
            // console.log('Fetched user:', data);
        } catch (error) {
            if (error instanceof Error && error.message.includes('403')) {
                console.error('Unauthorized access. Please check your token.');
            } else {
                console.error('An unexpected error occurred.');
            }
        }
    };

    const fetchRooms = async (quantity) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is not available');
                return;
            }

            const response = await fetch("http://14.225.254.188:8080/api/Rooms/filter-room-of-house", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }

            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setRoom(data.response);
            console.log('Fetched rooms:', data);
        } catch (error) {
            if (error instanceof Error && error.message.includes('403')) {
                console.error('Unauthorized access. Please check your token.');
            } else {
                console.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <ScrollView >
            <ImageBackground className="w-full h-screen" source={require("../img/Background.png")} >

                <View className="ml-6 flex-col">
                    <View className="ml-1 flex-row">
                        <Image className="w-16 h-16 mt-16" source={require("../img/Ellipse 149.png")} />
                        <View className="flex-col mt-16 ml-3">
                            <Text className="text-white text-base" >Xin Chào</Text>
                            <Text className="text-white text-xl font-bold">{user.fullName}</Text>
                        </View>
                        <View className="w-14 h-14 bg-gray-500 mt-16 opacity-90 flex rounded-full ml-8 justify-center items-center">
                            <Ionicons name="notifications" size={24} color="white" />


                        </View>
                    </View>

                </View>

                <View className="items-center mt-3">
                    <View className="items-center justify-center w-11/12 border-white border-2 rounded-2xl h-14 text-1.5xl p-3 bg-white flex-row">
                        <TextInput
                            className="-ml-64 w-9/12 text-xl -mt-1"
                            placeholder='Tìm kiếm'
                        />

                        <View className="-ml-72 items-center">

                            <Feather name="search" size={33} color="#A0AEC0" />
                        </View>
                    </View>
                </View>


                <View className=" absolute bottom-0 left-0 w-full h-3/4 bg-red-50 opacity-90 flex rounded-3xl">

                    <View className="flex-row justify-center items-center">
                        <View>
                            <View className="w-20 h-20 bg-red-200 opacity-90 flex rounded-full  mt-3 items-center justify-center">
                                <View className="w-16 h-16 bg-red-600 opacity-90 flex rounded-full  items-center justify-center">

                                    <Ionicons name="calendar-clear" size={25} color="white" />
                                </View>
                            </View>
                            <View className="justify-center items-center mt-2">
                                <Text className="">Thanh toán</Text>
                            </View>

                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate('Renderbuilding')}>
                            <View className="ml-2">
                                <View className="w-20 h-20 bg-red-200 opacity-90 flex rounded-full  mt-3 items-center justify-center">
                                    <View className="w-16 h-16 bg-red-600 opacity-90 flex rounded-full  items-center justify-center">

                                        <MaterialIcons name="manage-search" size={33} color="white" />
                                    </View>
                                </View>
                                <View
                                    className="justify-center items-center mt-2">
                                    <Text onPress={() => { navigation.navigate("Renderbuilding") }} className="">Khám phá</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <View className="ml-2">
                            <View className="w-20 h-20 bg-red-200 opacity-90 flex rounded-full  mt-3 items-center justify-center">
                                <View className="w-16 h-16 bg-red-600 opacity-90 flex rounded-full  items-center justify-center">

                                    <FontAwesome6 name="house-user" size={25} color="white" />
                                </View>
                            </View>
                            <View className="justify-center items-center mt-2">
                                <Text className="">Nhà của tôi</Text>
                            </View>

                        </View>

                        <Pressable onPress={() => {navigation.navigate("Signature")}} className="ml-2">
                            <View className="w-20 h-20 bg-red-200 opacity-90 flex rounded-full  mt-3 items-center justify-center">
                                <View className="w-16 h-16 bg-red-600 opacity-90 flex rounded-full  items-center justify-center">

                                    <Ionicons name="document-text" size={28} color="white" />
                                </View>
                            </View>
                            <View className="justify-center items-center mt-2">
                                <Text className="">Hợp đồng</Text>
                            </View>

                        </Pressable>

                    </View>




                    <View className="absolute bottom-0 left-0 w-full h-4/5	 bg-white ">
                        <View className="flex-row mt-5">
                            <Text className="ml-7 font-bold text-base">Gợi ý cho bạn</Text>
                            <Pressable onPress={() => { navigation.navigate("List_House") }}>
                                <Text className="text-red-600 ml-44">Xem thêm</Text>
                            </Pressable>
                        </View>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <FlatList
                                    data={room}
                                    numColumns={15}
                                    renderItem={({ item }) => (
                                        <View className="p-4 bg-white mb-2 rounded-lg shadow mt-4 ml-7">
                                            <View className="flex-row">
                                                <Image
                                                    source={require("../img/Rectangle 2464.png")}
                                                ></Image>

                                                <View className="-ml-16 mt-2 w-12 h-12 bg-gray-300 opacity-90 flex rounded-full items-center justify-center">
                                                    <AntDesign name="hearto" size={24} color="white" />
                                                </View>
                                            </View>

                                            <Text className="text-base text-gray-500 w-72" >{item.address ? item.address : "null"}</Text>
                                            <Text className="text-base text-green-500 mt-1" >{item.price ? item.price : "null"}</Text>
                                        </View>
                                    )}
                                >
                                </FlatList>
                                {/* <View className="mt-4 ml-7">
                                    <View className="flex-row">
                                        <Image
                                            source={room.image}
                                        ></Image>



                                        <View className="-ml-16 mt-2 w-12 h-12 bg-gray-300 opacity-90 flex rounded-full items-center justify-center">
                                            <AntDesign name="hearto" size={24} color="white" />
                                        </View>
                                    </View>

                                    <Text className="mt-2 text-base">
                                        {room.codeRoom ? room.codeRoom : "null"}
                                    </Text>


                                    <Text className="text-red-700 font-bold text-base">
                                        {room.rentPrice ? room.rentPrice : "null"}
                                    </Text>
                                </View>

                                <View className="mt-4 ml-10">
                                    <View className="flex-row">
                                        <Image
                                            source={room.image}
                                        ></Image>

                                        <View className="-ml-16 mt-2 w-12 h-12 bg-gray-300 opacity-90 flex rounded-full items-center justify-center">
                                            <AntDesign name="hearto" size={24} color="white" />
                                        </View>
                                    </View>

                                    <Text className="mt-2 text-base">
                                        {room.codeRoom ? room.codeRoom : "null"}
                                    </Text>

                                    <Text className="text-red-700 font-bold text-base">
                                        {room.rentPrice ? room.rentPrice : "null"}
                                    </Text>
                                </View> */}
                            </ScrollView>
                        </View>

                        <View className="flex-row mt-10">
                            <View className="justify-center items-center">
                                <Image className="ml-7" source={require("../img/Rectangle 2469.png")} />

                                <View

                                    className="ml-10 -mt-20 ">
                                    <Text className="text-white text-xl font-bold">Studio</Text>
                                    <Text
                                        className="text-white -ml-1 text-base	">Khám phá</Text>
                                </View>
                            </View>

                            <View className="justify-center items-center -ml-5">
                                <Image className="ml-7" source={require("../img/Rectangle 2469 (1).png")} />

                                <View className="ml-10 -mt-20">
                                    <Text className="text-white text-xl font-bold">Duplex</Text>
                                    <Text className="text-white -ml-1 text-base	">Khám phá</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView >
    )
}
