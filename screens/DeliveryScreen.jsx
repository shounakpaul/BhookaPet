import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectResturant } from "../features/resturantSlice";
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedLottieView from "lottie-react-native";

const DeliveryScreen = () => {
  const navigation = useNavigation();

  const resturant = useSelector(selectResturant);

  return (
    <View className="bg-[#42adff] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <QuestionMarkCircleIcon color="white" size={30} />
            <Text className="font-light text-white text-lg ml-2">
              Order Help
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View className="">
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>

            <AnimatedLottieView
              source={require("../assets/deliveryGuy.json")}
              className="h-20 w-20"
              autoPlay
              loop
            />
          </View>

          <Progress.Bar
            size={30}
            color="#42adff"
            indeterminate={true}
            className="mt-5"
          />

          <Text className="text-gray-500 mt-3">
            Your order at {resturant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: resturant.lat,
          longitude: resturant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: resturant.lat,
            longitude: resturant.long,
          }}
          title={resturant.title}
          description={resturant.short_description}
          identifier="origin"
          pinColor="#42adff"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20 pb-6">
        <Image
          source={require("../assets/foodGuy.png")}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Jeff</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <Text className="text-[#42adff] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
