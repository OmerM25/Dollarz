import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Pages from "../index";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Goals"
        component={Pages.Goals}
        options={{
          tabBarIcon: ({ tintColor }) => <Icon name="bullseye" size={25} color={tintColor} />,
          activeTintColor: "#6C63FC",
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Chores"
        component={Pages.Chores}
        options={{
          tabBarIcon: ({ tintColor }) => <Icon name="list-ol" size={25} color={tintColor} />,
          activeTintColor: "#6C63FC",
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="HomeChild"
        component={Pages.HomeChild}
        options={{
          tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
          activeTintColor: "#6C63FC",
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="History"
        component={Pages.History}
        options={{
          tabBarIcon: ({ tintColor }) => <Icon name="history" size={25} color={tintColor} />,
          activeTintColor: "#6C63FC",
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Study"
        component={Pages.Study}
        options={{
          tabBarIcon: ({ tintColor }) => <Icon name="graduation-cap" size={25} color={tintColor} />,
          activeTintColor: "#6C63FC",
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="MainLayout" component={MyTabs} />
        <Stack.Screen name="Login" component={Pages.Login} />
        <Stack.Screen name="Register" component={Pages.Register} />
        <Stack.Screen name="AskMoney" component={Pages.AskMoney} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
