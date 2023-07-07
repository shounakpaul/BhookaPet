import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 15000);
  }, []);

  return (
    <SafeAreaView className="bg-sky-50 flex-1 justify-center items-center">
      <AnimatedLottieView
        source={require("../assets/orderLoading.json")}
        animation="slideInUp"
        className="h-96 w-96"
        autoPlay
        loop
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-xl my-10 text-[#42adff] font-extrabold text-center"
      >
        Placing your order...
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="#42adff" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
