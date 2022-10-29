import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Book from "../utils/utils";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { useRoute } from "@react-navigation/native";

interface detailsProp {
  data: Book | undefined;
}

const BookDetails = ({ data }: detailsProp) => {
  const route = useRoute();
  const {
    title,
    subtitle,
    author,
    imgUrl,
    id,
    pages,
    isbn,
    description,
    publisher,
    published,
  } = route.params;
  return (
    <SafeAreaView>
      <View className="px-4 py-4">
        <Text className="py-4 text-xl text-center">Details</Text>
        <Image
          source={{ uri: imgUrl }}
          className="rounded-md w-[350px] h-[350px] self-center object-cover"
        />
        <View className="p-4">
          <Text className="mb-2 text-2xl">{title}</Text>
          <Text className="mb-4">{description}</Text>
          <Text className="text-xl">By { author}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookDetails;
