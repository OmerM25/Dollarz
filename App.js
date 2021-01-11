import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <AppContainer />
  );
}



class goalScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> מטרה אישית לחיסכון </Text>
      </View>
    );
  }
}

class choresScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> המטלות בבית שלנו </Text>
      </View>
    );
  }
}

class homeScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> מסך הבית </Text>
      </View>
    );
  }
}

class historyScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> היסטורית הבקשות שלי </Text>
      </View>
    );
  }
}

class studyScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> ידע זה כוח </Text>
      </View>
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    goal: {
      screen: goalScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bullseye" size={25} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#6C63FC',
          showLabel: false,
      }
      }
    },
    chores: {
      screen: choresScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="tasks" size={25} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#6C63FC',
          showLabel: false,
      }
      }
    },
    home: {
      screen: homeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#6C63FC',
          showLabel: false,
      }
      }
    },
    history: {
      screen: historyScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" size={25} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#6C63FC',
          showLabel: false,
      }
      }
    },
    study: {
      screen: studyScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="graduation-cap" size={25} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#6C63FC',
          showLabel: false,
      }
      }
    },
  },
  {
    initialRouteName: 'home'
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
