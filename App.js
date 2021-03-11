import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";
import NavContainer from "./pages/components/NavContainer";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <NavContainer />
      <FlashMessage position="bottom" floating={true} />
    </View>
  );
}
