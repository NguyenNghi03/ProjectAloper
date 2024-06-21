import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/view/Login';
import Login1 from './src/view/Login1';
import REGISTER_SDT from './src/view/REGISTER_SDT';
import REGISTER_NAME from './src/view/REGISTER_NAME';
import REGISTER_MAIL from './src/view/REGISTER_MAIL';
import REGISTER_PASSWORD from './src/view/REGISTER_PASSWORD';
import Renderbuilding from './src/view/Renderbuilding';
import Home from './src/view/Home';
import Chat from './src/view/Chat';
import Favorite from './src/view/Favorite';
import Profile from './src/view/Profile';
import List_House from './src/view/List_House';
import Detail_House from './src/view/Detail_House';
import Contract from './src/view/Contract';
import Signature from './src/view/Signature';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 80,
          backgroundColor: "#fff",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;
          let labelComponent;

          if (route.name === "Trang Chủ") {
            iconComponent = (
              <Image
                source={require("./src/img/home.png")}
                style={{
                  width: 20,
                  marginTop: 6,
                  tintColor: focused ? "#B91C1C" : "#6B7280",
                }}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#B91C1C" : "#6B7280", marginTop: 4 }}>
                Trang Chủ
              </Text>
            );
          } else if (route.name === "Trò Chuyện") {
            iconComponent = (
              <Image
                source={require("./src/img/message.png")}
                style={{
                  width: 22,
                  marginTop: 6,
                  tintColor: focused ? "#B91C1C" : "#6B7280",
                }}
              />);
            labelComponent = (
              <Text style={{ color: focused ? "#B91C1C" : "#6B7280", marginTop: 4 }}>
                Trò Chuyện
              </Text>
            );
          } else if (route.name === "Yêu Thích") {
            iconComponent = (
              <Image
                source={require("./src/img/heart.png")}
                style={{
                  width: 22,
                  marginTop: 6,
                  tintColor: focused ? "#B91C1C" : "#6B7280",
                }}
              />);
            labelComponent = (
              <Text
                style={{ color: focused ? "#B91C1C" : "#6B7280", marginTop: 4 }}
              >
                Yêu Thích
              </Text>
            );
          } else if (route.name === "Hồ sơ") {
            iconComponent = (
              <Image
                source={require("./src/img/profile.png")}
                style={{
                  width: 20,
                  marginTop: 6,
                  tintColor: focused ? "#B91C1C" : "#6B7280",
                }}
              />
            );
            labelComponent = (
              <Text
                style={{ marginTop: -2, color: focused ? "#B91C1C" : "#6B7280" }}
              >
                Hồ sơ
              </Text>
            );
          }
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
              }}
            >
              {iconComponent}
              {labelComponent}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Trang Chủ" component={Home} />
      <Tab.Screen name="Trò Chuyện" component={Chat} />
      <Tab.Screen name="Yêu Thích" component={Favorite} />
      <Tab.Screen name="Hồ sơ" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login1" component={Login1} />
        <Stack.Screen name="REGISTER_SDT" component={REGISTER_SDT} />
        <Stack.Screen name="REGISTER_NAME" component={REGISTER_NAME} />
        <Stack.Screen name="REGISTER_MAIL" component={REGISTER_MAIL} />
        <Stack.Screen name="REGISTER_PASSWORD" component={REGISTER_PASSWORD} />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Renderbuilding" component={Renderbuilding} />
        <Stack.Screen name="List_House" component={List_House} />
        <Stack.Screen name="Detail_House" component={Detail_House} />
        <Stack.Screen name="Contract" component={Contract} />
        <Stack.Screen name="Signature" component={Signature} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}