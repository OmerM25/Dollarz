import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-gesture-handler";
import * as Pages from "./index";

const bottomTabNavigator = createBottomTabNavigator(
  {
    goal: {
      screen: Pages.Goals,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="bullseye" size={25} color={tintColor} />,
        tabBarOptions: {
          activeTintColor: "#6C63FC",
          showLabel: false,
        },
      },
    },
    chores: {
      screen: Pages.Chores,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="list-ol" size={25} color={tintColor} />,
        tabBarOptions: {
          activeTintColor: "#6C63FC",
          showLabel: false,
        },
      },
    },
    home: {
      screen: Pages.Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
        tabBarOptions: {
          activeTintColor: "#6C63FC",
          showLabel: false,
        },
      },
    },
    history: {
      screen: Pages.History,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="history" size={25} color={tintColor} />,
        tabBarOptions: {
          activeTintColor: "#6C63FC",
          showLabel: false,
        },
      },
    },
    study: {
      screen: Pages.Study,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="graduation-cap" size={25} color={tintColor} />,
        tabBarOptions: {
          activeTintColor: "#6C63FC",
          showLabel: false,
        },
      },
    },
  },
  {
    initialRouteName: "home",
  }
);

const MainLayout = () => {
  const AppContainer = createAppContainer(bottomTabNavigator);

  return (
      <AppContainer />
  )
};

export default MainLayout;
