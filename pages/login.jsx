import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
import { Button } from "../common/Button";
import { CustomText } from "../common/CustomText";
import AxiosInstance from "../utils/AxiosInstance";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const img = require("../images/LoginPage.png");

const Login = ({ navigation: { navigate } }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    AxiosInstance.post("user/login", {
      userId: id,
      password: password,
    })
      .then((res) => {
        // Always attach token to axios requests header
        AxiosInstance.defaults.headers.common = {
          Authorization: "Bearer " + res.data.token,
        };
        navigate("MainLayout");
      })
      .catch((err) =>
        showMessage({
          message: "ארעה שגיאה בהתחברות",
          description: "משתמש אינו קיים",
          type: "error",
          textAlign: "right",
        })
      );
  };
  return (
    <View style={styles.view}>
      <CustomText style={styles.welcome}>ברוך הבא ל- Dollarz !</CustomText>
      <Image source={img} style={styles.img} />
      <CustomText style={styles.inputHeadline}>תעודת זהות</CustomText>
      <TextInput value={id} onChangeText={(id) => setId(id)} style={styles.input} />
      <CustomText style={styles.inputHeadline}>סיסמא</CustomText>
      <TextInput value={password} onChangeText={setPassword} style={styles.input} />
      <FlashMessage position="top" />
      <Button title="התחבר" color={"#3A23CD"} onPress={handleLogin}></Button>
      <Button title="הורה? הירשם עכשו" color={"#3A23CD"} onPress={() => navigate("Register")}></Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  welcome: {
    marginTop: 30,
    fontSize: 30,
  },
  view: {
    alignItems: "center",
    marginTop: 50,
  },
  img: {
    width: 200,
    height: 178,
    marginTop: 70,
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: 180,
    marginBottom: 20,
    backgroundColor: "#CCCCCC",
    borderRadius: 2,
  },
  inputHeadline: {
    fontSize: 18,
    marginBottom: 15,
  },
});
