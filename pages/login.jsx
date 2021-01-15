import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { CustomText } from "../common/CustomText";

const img = require("../images/LoginPage.png");
const Login = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.welcome}>ברוך הבא ל- Dollarz !</Text>
      <Image source={img} style={styles.img} />
    </View>
  );
};


export default Login;

const styles = StyleSheet.create({
  welcome: {
    marginTop: 30,
    fontSize: 30
  },
  view: {
    alignItems: "center",
    marginTop: 50
  },
  img: {
    marginTop: 70
  }

})