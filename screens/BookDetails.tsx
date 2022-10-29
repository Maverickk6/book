import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Book from "../utils/utils";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";


import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { useRoute } from "@react-navigation/native";

interface detailsProp {
  data: Book | undefined;
}

const BookDetails = ({ data }: detailsProp) => {
  const navigation = useNavigation();

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
      <ScrollView className="px-4 py-4 my-4">
        <View className="flex-row justify-between py-4 mb-8">
          <Text className="text-xl">Details</Text>
          <Pressable className="flex-row items-center" onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color="blue"/>
            <Text className="ml-2 text-xl text-blue-600">Go back</Text>
          </Pressable>
        </View>
        <Image
          source={{ uri: imgUrl }}
          className="rounded-md w-[350px] h-[350px] self-center object-cover"
        />
        <View className="p-2 bg-[#cacdc9] my-4 rounded-lg">
          <Text className="mb-2 text-[20px]">{title}</Text>
          <Text className="mb-4 text-lg">{subtitle}</Text>
          <Text className="mb-4 leading-5 text-[15px]">{description}</Text>
          <Text className="mb-2 text-red-600 text-md">By {author}</Text>
          <Text>
            Was Published {published} by {publisher}
          </Text>
          <Text className="my-4 text-green-700 text-md">{pages} pages</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetails;
