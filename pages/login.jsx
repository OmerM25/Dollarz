import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { CustomText } from "../common/CustomText";

const img = require("../images/LoginPage.png");
const Login = () => {
  return (
    <View style={styles.view}>
      <CustomText style={styles.welcome}>ברוך הבא ל- Dollarz !</CustomText>
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
    width: 200,
    height: 178,
    marginTop: 70
  }

})