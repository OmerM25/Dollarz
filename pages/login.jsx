import React from "react";
import { StyleSheet, Button, View } from "react-native";

const Login = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Button style={styles.button1} onPress={() => props.navigation.navigate("Register")} title="register" />
    </View>
  );
};

const styles = StyleSheet.create({
  button1: {
    justifyContent: "center",
    color: "red",
  },
});

export default Login;
