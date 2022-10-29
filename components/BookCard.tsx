import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import Book from "../utils/utils";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ArrowRightIcon } from "react-native-heroicons/outline";
import { RootStackParamList } from "../App";

interface BookProp {
  books: Book;
  accessibilityLabel: string;
}

type detailsScreenProps = StackNavigationProp<RootStackParamList, "Details">;

const BookCard = ({ books }: BookProp) => {
  let data: Book | undefined = books;

  return (
    <View className="flex-row items-center justify-between p-2 my-4 bg-gray-200 rounded-md shadow-sm">
      <Image
        source={{ uri: books.imgUrl }}
        className="w-[100px] h-[100px] p-2 mr-4 rounded-md"
      />
      <View className="flex-1 ">
        <Text className="mb-1 text-[16px]">{books.title}</Text>
        <Text className="mb-2 text-[13px]">{books.subtitle}</Text>
        <Text className="text-[12px]">Author: {books.author}</Text>
        <Text className="text-[11px]">Pages: {books.pages}</Text>
        <Text className="mt-2 text-gray-500 text-[12px]">Publisher: {books.publisher}</Text>
      </View>
      <View className="ml-[5px]">
        <ArrowRightIcon size={25} color="#0EC13E" />
      </View>
    </View>
  );
};

export default BookCard;
