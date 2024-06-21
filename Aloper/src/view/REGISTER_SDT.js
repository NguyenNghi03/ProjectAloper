import { View, Text, ScrollView, Image, Button, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function REGISTER_SDT({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleContinue = () => {
        // Chuyển dữ liệu sang màn hình tiếp theo
        navigation.navigate('REGISTER_NAME', { phoneNumber: phoneNumber });
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
                    onPress={() => { navigation.navigate("Login") }}
                    className="absolute top-0 left-0 p-6 text-1xl text-gray-400">X</Text>

                <View className="ml-36 flex-row absolute top-0 left-0 p-6 text-1xl ">
                    <FontAwesome name="circle-o" size={13} color="#DC2626" />
                    <View className="ml-1">
                        <FontAwesome name="circle-o" size={13} color="#9CA3AF" />
                    </View>
                    <View className="ml-1">
                        <FontAwesome name="circle-o" size={13} color="#9CA3AF" />
                    </View>
                    <View className="ml-1">
                        <FontAwesome name="circle-o" size={13} color="#9CA3AF" />
                    </View>
                </View>

                <View className="justify-center items-center -mt-72 ">

                    <Text className="text-center font-bold text-3xl mt-3">Nhập số điện thoại</Text>


                </View>

                <TextInput
                    className="w-5/6 border-rose-500 border-2 rounded-2xl h-14  text-1.5xl p-3 mt-20"
                    onChangeText={text => setPhoneNumber(text)}
                    value={phoneNumber}
                    keyboardType="numeric"
                />

                <Pressable onPress={handleContinue} className="bg-red-600 rounded-2xl w-5/6 h-14 justify-center items-center mt-4">
                    <Text className="text-white text-lg ">Tiếp tục </Text>
                </Pressable>

            </View>


        </ScrollView>
    )
}