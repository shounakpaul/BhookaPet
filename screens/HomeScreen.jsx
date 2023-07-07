import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import AnimatedLottieView from "lottie-react-native";

import FoodGuy from "../assets/foodGuy.png";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"]{
      ...,
      resturants[]->{
        ...,
        dishes[]->
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-blue-100 pt-5 pb-24">
      <View className="flex-row pb-3 items-center space-x-2 mx-4 ">
        <Image
          source={FoodGuy}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-xl ">Current Location</Text>
            <ChevronDownIcon size={20} color="#42adff" />
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <UserCircleIcon size={35} color="#42adff" />
          <Cog6ToothIcon color="#42adff" size={33} />
        </View>
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row bg-sky-50 space-x-2 items-center px-3 py-1 flex-1 rounded-lg">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput placeholder="Restaurants and Cuisines" />
        </View>
      </View>
      <ScrollView className="bg-sky-50">
        <Categories />
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          ></FeaturedRow>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
