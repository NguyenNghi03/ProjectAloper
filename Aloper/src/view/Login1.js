import { View, Text, ScrollView, Image, Button, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from "react";
import localStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login1({ navigation }) {
    const [data, setData] = useState({ userName: "ChuNha1234", password: "ChuNha1234" });


    const saveTokenToStorage = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log(error);
        }
    };

    const viewToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('====================================');
            console.log('Nội dung của token:', token);
            console.log('====================================');
        } catch (error) {
            console.log(error);
        }
    };

    const Login = async () => {
        // Kiểm tra xem số điện thoại không được để trống
        if (!data.userName.trim()) {
            Alert.alert(
                "Thông báo",
                "Vui lòng nhập số điện thoại.",
                [{ text: "OK" }]
            );
            return;
        }
    
        // Kiểm tra xem mật khẩu không được để trống
        if (!data.password.trim()) {
            Alert.alert(
                "Thông báo",
                "Vui lòng nhập mật khẩu.",
                [{ text: "OK" }]
            );
            return;
        }
    
        try {
            const response = await axios.post(
                "http://14.225.254.188:8080/api/Accounts/sign-in",
                data,
                {
                    headers: { "Content-type": "application/json" },
                }
            );
            await AsyncStorage.setItem("userData", JSON.stringify(response.data));
            await saveTokenToStorage(response.data.token);
            await viewToken();
            // Thông báo thành công
            Alert.alert("Success", "Đăng nhập thành công");
            // console.log(response.data.token);
            navigation.navigate("Home");
        } catch (error) {
            console.log(error);
             // Thông báo thất bại
             Alert   .alert("Error", "Đăng nhập thất bại");
        }
    };
    
    // const Login = async () => {
    //     try {
    //         const response = await axios.post(
    //             "http://14.225.198.48:8080/api/Accounts/sign-in",
    //             data,
    //             {
    //                 headers: { "Content-type": "application/json" },
    //             }
    //         );
    //         localStorage.setItem("userData", JSON.stringify(response.data));
    //         navigation.navigate("Login");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <ScrollView >



            <View className="flex-1 justify-center items-center ">
                <Image className="w-full h-screen" source={require("../img/Login.png")} />
                <View className="flex-1 justify-center items-center">
                </View>
            </View>


            <View className="flex-1 justify-center items-center  absolute bottom-0 left-0 w-full h-5/6 bg-white opacity-90 flex   rounded-3xl">
                <Text
                    onPress={() => { navigation.navigate("Login") }}
                    className="absolute top-0 left-0 p-6 text-1xl text-gray-400">X</Text>
                <View className="justify-center items-center -mt-72 ">

                    <Text className="text-center text-lg font-bold text-3xl mt-3">Đăng nhập</Text>
                    <Text className="text-gray-600 mt-2">Dễ dàng quản lý căn nhà của bạn với Aloper</Text>


                </View>


                <Text className="mr-56 mt-15 mt-8 " >Số điện thoại</Text>
                <TextInput
                    className="w-5/6 border-rose-500 border-2 rounded-2xl h-14 mt-1 text-1.5xl p-3 "
                    value={data.userName}
                    onChangeText={(text) => {
                        setData({ ...data, userName: text });
                    }}
                />
                <Text className="-ml-64 mt-15 mt-1 " >Password</Text>
                <TextInput
                    className="w-5/6 border-rose-500 border-2 rounded-2xl h-14 mt-1 text-1.5xl p-3 "
                    value={data.password}
                    onChangeText={(text) => {
                        setData({ ...data, password: text });
                    }}
                />
                <Pressable onPress={Login} className="bg-red-600 rounded-2xl w-5/6 h-14 justify-center items-center mt-4">
                    <Text className="text-white text-lg ">Đăng nhập </Text>
                </Pressable>
                <Text className="text-red-600 mt-3"> Quên mật khẩu? </Text>
            </View>


        </ScrollView>
    )
}