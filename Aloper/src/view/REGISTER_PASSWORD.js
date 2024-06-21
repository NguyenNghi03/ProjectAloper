import { View, Text, ScrollView, Image, Button, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";

export default function REGISTER_PASSWORD({ navigation, route }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const userInfo = {
        userName: route.params?.name,
        email: route.params?.email,
        phoneNumber: route.params?.phoneNumber,
        password: password,
        telegramId: "123456789",
        identification: "ID123456",
        signature: "c2lnbmF0dXJlX3ZhbHVl",  // Giá trị Base64 cho signature
        issuedBy: "authority_name",
        role: "user",
        fullName: route.params?.name,
        accountName: route.params?.name + "_account",
        position: "position_value",
        bod: "2024-06-03T15:33:10.880Z",
        accountNumber: "1234567890",
        permanentAddress: "123 Main St, City, Country",
        bankCode: "bank_code_value",
        dateRange: "2024-06-03T15:33:10.880Z",
        tokenGroupChatContract: "",
        groupChatContractId: "",
        tokenGroupChatDeposit: "",
        groupChatDepositId: "",
        ownerId: "",
    };
    const handleRegister = async () => {
        try {
            console.log(userInfo);
            const response = await axios.post(
                "http://14.225.198.48:8080/api/Accounts/sign-up",
                userInfo,
                {
                    headers: { "Content-type": "application/json" },
                }
            );
            console.log("thành công");
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ScrollView >



            <View className="flex-1 justify-center items-center ">
                <Image className="w-full h-screen" source={require("../img/Login.png")} />
                <View className="flex-1 justify-center items-center">
                </View>
            </View>





            <View className="flex-1 justify-center items-center  absolute bottom-0 left-0 w-full h-5/6 bg-white opacity-90 flex   rounded-3xl">
                <Text
                    onPress={() => { navigation.navigate("REGISTER_MAIL") }}
                    className="absolute top-0 left-0 p-6 text-1xl text-gray-400">X</Text>


                <View className="ml-36 flex-row absolute top-0 left-0 p-6 text-1xl ">
                    <FontAwesome name="circle-o" size={13} color="#9CA3AF" />
                    <View className="ml-1">
                        <FontAwesome name="circle-o" size={13} color="#9CA3AF" />
                    </View>
                    <View className="ml-1">
                        <FontAwesome name="circle-o" size={13} color="#9CA3AF" />
                    </View>
                    <View className="ml-1">
                        <FontAwesome name="circle-o" size={13} color="#DC2626" />
                    </View>
                </View>



                <View className="justify-center items-center -mt-72 ">

                    <Text className="text-center text-lg font-bold text-3xl mt-3">Mật khẩu</Text>



                </View>


                <TextInput
                    className="w-5/6 border-rose-500 border-2 rounded-2xl h-14 text-1.5xl p-3 mt-20"
                    placeholder='Mật khẩu'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={!showPassword}
                />

                <View className="-mt-10">
                    <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        className="ml-72 "
                    >
                        {showPassword ? (
                            <AntDesign name="eye" size={20} color="#9CA3AF" />
                        ) : (
                            // Ngược lại, nếu đang ẩn mật khẩu, hiển thị biểu tượng mắt đóng
                            <Entypo name="eye-with-line" size={20} color="#9CA3AF" />
                        )}
                    </Pressable>
                </View>


                <TextInput
                    className="w-5/6 border-rose-500 border-2 rounded-2xl h-14 text-1.5xl p-3 mt-10"
                    placeholder='Xác nhận mật khẩu'
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={!showPassword1}
                />
                <View className="-mt-10">
                    <Pressable
                        onPress={() => setShowPassword1(!showPassword1)}
                        className="ml-72 "
                    >
                        {showPassword1 ? (
                            <AntDesign name="eye" size={20} color="#9CA3AF" />
                        ) : (
                            // Ngược lại, nếu đang ẩn mật khẩu, hiển thị biểu tượng mắt đóng
                            <Entypo name="eye-with-line" size={20} color="#9CA3AF" />
                        )}
                    </Pressable>
                </View>



                <Pressable onPress={handleRegister} className="bg-red-600 rounded-2xl w-5/6 h-14 justify-center items-center mt-10">
                    <Text className="text-white text-lg ">Tiếp tục </Text>
                </Pressable>

            </View>


        </ScrollView>
    )
}