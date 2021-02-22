import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import parentTabs from "./parentTabs";
import childTabs from "./childTabs";
import * as Pages from "../index";

const Stack = createStackNavigator();

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="ParentTabs" component={parentTabs} />
        <Stack.Screen name="ChildTabs" component={childTabs} />
        <Stack.Screen name="Login" component={Pages.Login} />
        <Stack.Screen name="Register" component={Pages.Register} />
        <Stack.Screen name="AskMoney" component={Pages.AskMoney} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
