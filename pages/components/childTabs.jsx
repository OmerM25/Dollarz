import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Pages from "../index";

const Tab = createBottomTabNavigator();

export default function childTabs() {
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
