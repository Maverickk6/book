import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Book from "../utils/utils";
import BookCard from "../components/BookCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

type detailsScreenProps = StackNavigationProp<RootStackParamList, "Details">;

const Homescreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState<Book | undefined | any>();

  const navigation = useNavigation<detailsScreenProps>();

  useEffect(() => {
    fetch("https://fudap-books-api.herokuapp.com/books/")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  });

  const getContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          testId="loading"
          accessibilityLabel="App is loading books"
        />
      );
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <FlatList
        data={data}
        keyExtractor={(books, index) => {
          return books.id;
        }}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  id: item.id,
                  isbn: item.isbn,
                  title: item.title,
                  subtitle: item.subtitle,
                  author: item.author,
                  published: item.published,
                  publisher: item.publisher,
                  pages: item.pages,
                  description: item.description,
                  imgUrl: item.imgUrl,
                })
              }
            >
              <BookCard books={item} accessibilityLabel="books" />
            </Pressable>
          );
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text className="my-4 text-lg text-center text-red-500">Homescreen</Text>
      <View>{getContent()}</View>
    </View>
  );
};

export default Homescreen;
