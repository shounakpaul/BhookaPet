import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

export default function ResturantCard({
  imgUrl,
  title,
  id,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Resturant", {
          imgUrl,
          title,
          id,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow-lg rounded-lg"
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-32 w-full rounded-t-lg"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="#42adff" size={22} opacity={0.8} />
          <Text className="text-xs text-gray-500">
            <Text className=" text-blue-500">{rating}</Text> · {genre}
          </Text>
        </View>
        <View className="space-x-1 flex-row items-center">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
