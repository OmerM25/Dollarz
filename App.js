import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login";
import MainLayout from "./pages/mainLayout";
import Register from "./pages/register";
import AskMoney from "./pages/askmoney";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="AskMoney">
        <Stack.Screen name="MainLayout" component={MainLayout} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AskMoney" component={AskMoney} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



