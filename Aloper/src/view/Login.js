import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'

export default function Login({ navigation }) {
    return (
        <ScrollView>


            <View className="flex-1 justify-center items-center ">
                <Image className="w-full h-screen" source={require("../img/Login.png")} />

            </View>

            <View className="flex-1 justify-center items-center -my-72">


                <View className="justify-center items-center -mt-20 ">
                    <Image className="mt-35 " source={require("../img/Logo.png")} />
                    <Text className="text-center text-lg font-bold text-3xl mt-3">Chào mừng đến với Aloper</Text>
                    <Text className="text-gray-600 mt-2">Dễ dàng quản lý căn nhà của bạn với Aloper</Text>


                </View>



                <Pressable onPress={() => { navigation.navigate("REGISTER_SDT") }} className="bg-red-600 rounded-2xl w-5/6 h-14 justify-center items-center mt-8">
                    <Text className="text-white text-lg">Đăng ký</Text>
                </Pressable>

                <Pressable onPress={() => { navigation.navigate("Login1") }} className="bg-red-100 rounded-2xl w-5/6 h-14 justify-center items-center mt-4">
                    <Text className="text-red-700 text-lg ">Đăng nhập </Text>
                </Pressable>

                <View className="text-center">
                    <Text className="text-gray-600 text-center mt-3">
                        Bằng việc đăng nhập, tôi đồng với
                        <Text className="text-red-600"> điều khoản sử dụng </Text>
                        và
                        <Text className="text-red-600 ">  chính sách riêng tư của Aloper.</Text>
                        của Aloper.</Text>
                </View>
            </View>


        </ScrollView>
    )
}