import React, { useEffect, useState } from "react";
import Homescreen from "./screens/Homescreen";
import BookDetails from "./screens/BookDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Book from "./utils/utils";

const Stack = createNativeStackNavigator<RootStackParamList | never>();

export type RootStackParamList = {
  Home: undefined;
  Details: {
   id: number;
   isbn: string;
   title: string;
   subtitle: string;
   author: string;
   published: string;
   publisher: string;
   pages: number;
   description: string;
   imgUrl: string;
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerTintColor: "white",
        }}
      >
        {/* screens */}
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Details" component={BookDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
