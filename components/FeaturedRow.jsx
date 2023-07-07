import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "./ResturantCard";
import sanityClient from "../sanity";

export default function FeaturedRow({ title, description, id }) {
  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" && _id == $id] {
        ...,
        resturants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
        { id }
      )
      .then((data) => {
        setResturants(data?.resturants);
      })
      .catch((err) => {
        console.log("Err at Featured Row:", err);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row justify-between items-center px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#42adff" />
      </View>
      <Text className="text-xs font-bold text-gray-500 px-4">
        {description}
      </Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {resturants?.map((resturant) => (
          <ResturantCard
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image}
            title={resturant.name}
            rating={resturant.rating}
            genre={resturant.type?.name}
            address={resturant.address}
            short_description={resturant.short_description}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
