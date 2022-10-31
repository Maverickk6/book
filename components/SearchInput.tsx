import { View, Text, TextInput } from "react-native";

import React, { useState } from "react";

const SearchInput = () => {
  const [text, setText] = useState("");

  const searchInputHandler = (enteredInputText) => {
    setText(enteredInputText);
  };
  return (
    <View className="p-2 mx-1 mt-[20px] bg-gray-300 rounded">
      <TextInput
        onChangeText={searchInputHandler}
        placeholder="Search For books"
        value={text}
      />
    </View>
  );
};

export default SearchInput;
