import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Pages from "../index";
import AxiosInstance from "../../utils/AxiosInstance";

const Tab = createBottomTabNavigator();

export default function childTabs(props) {
  const [child, setChild] = useState("");

  useEffect(() => {
    AxiosInstance.get("/user/_id").then((res) => {
      AxiosInstance.post("/child", { childId: res.data.toString() }).then((res) => {
        setChild(res.data);
      });
    });
  }, []);

  return (
    <Tab.Navigator initialRouteName="HomeChild">
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
        children={() => <Pages.HomeChild navigation={props.navigation} child={child} />}
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
        children={() => <Pages.Study navigation={props.navigation} child={child} />}
        options={{
          tabBarIcon: ({ tintColor }) => <Icon name="graduation-cap" size={25} color={tintColor} />,
          activeTintColor: "#6C63FC",
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}
