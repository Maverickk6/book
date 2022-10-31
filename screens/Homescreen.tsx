import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  TextInput,
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
  const [data, setData] = useState<Book[] | undefined[]>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation<detailsScreenProps>();

  // filter((searchTerm) => data[index].title === searchTerm);
  // }

  useEffect(() => {
    fetch("https://fudap-books-api.herokuapp.com/books/")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result);
          setFilteredData(result);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchTerm(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredData(data);
      setSearchTerm(text);
    }
  };

  const getContent = () => {
    if (isLoading) {
      return (
        <View style={{ height: "100%", width: "100%" }}>
          <ActivityIndicator
            size="large"
            testId="loading"
            accessibilityLabel="App is loading books"
          />
        </View>
      );
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <FlatList
        data={filteredData}
        keyExtractor={(books) => {
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
      <View className="p-2 mx-1 mt-[20px] bg-gray-300 rounded">
        <TextInput
          placeholder="Search For books"
          onChangeText={(text) => searchFilterFunction(text)}
          value={searchTerm}
        />
      </View>
      <View className="mt-8">{getContent()}</View>
    </View>
  );
};

export default Homescreen;
