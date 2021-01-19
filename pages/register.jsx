import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Button, Image } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";
import FlashMessage from "react-native-flash-message";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const checkValidation = () => {
    const nameRegex = new RegExp("^[\u0590-\u05FF]*$");

    if (firstName === "" || lastName === "" || idNumber === "" || password === "" || secondPassword === "") {
      showMessage({
        message: "כל השדות הם חובה למילוי",
        description: "אנא מלא שדות ריקים",
        type: "error",
        textAlign: "right",
      });
      return;
    } else {
      if (!nameRegex.test(firstName)) {
        showMessage({
          message: "שם פרטי שגוי",
          description: "הכנס  אותיות בלבד",
          type: "error",
          textAlign: "right",
        });
        return;
      }

      if (!nameRegex.test(lastName)) {
        showMessage({
          message: "שם משפחה שגוי",
          description: "הכנס  אותיות בלבד",
          type: "error",
          textAlign: "right",
        });
        return;
      }

      if (idNumber.length > 9 || !checkIDValidation()) {
        showMessage({
          message: "תעודת זהות שגויה",
          type: "error",
          textAlign: "right",
        });
        return;
      }

      if (password !== secondPassword) {
        setPassword("");
        setSecondPassword("");

        showMessage({
          message: "סיסמאות אינן תואמות",
          type: "error",
          textAlign: "right",
        });
        return;
      }
    }

    // Register User

    // Navigate to home screen
    //props.navigation.navigate("MainLayout");
  };

  const checkIDValidation = () => {
    const idRegex = new RegExp("^[0-9]+$");

    if (idRegex.test(idNumber)) {
      let id = idNumber;

      // check if the id is valid
      id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
      return (
        Array.from(id, Number).reduce((counter, digit, i) => {
          const step = digit * ((i % 2) + 1);
          return counter + (step > 9 ? step - 9 : step);
        }) %
          10 ===
        0
      );
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{ width: 300, height: 150 }} source={require("./../images/Component 16 Γאף 1.png")} />
      </View>
      <View style={styles.footer}>
        <Text style={{ fontSize: 28, marginTop: 25 }}> איזה כיף שהחלטתם להירשם! </Text>
        <Text style={{ fontSize: 15, color: "#4525F2", marginTop: 25, marginBottom: 20 }}>
          שימו לב- מלאו את הפרטים של אחד ההורים, שניכם תוכלו להחבר יחד לאותו החשבון
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={firstName}
            placeholder="שם פרטי"
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            value={lastName}
            placeholder="שם משפחה"
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            value={idNumber}
            placeholder="תעודת זהות"
            onChangeText={(text) => setIdNumber(text)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="סיסמא"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            value={secondPassword}
            placeholder="סיסמא חוזרת"
            secureTextEntry
            onChangeText={(text) => setSecondPassword(text)}
          />
          <View style={{ marginTop: 20 }}>
            <Button onPress={checkValidation} title="הרשם" color="#4525F2" />
          </View>
        </View>
      </View>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    flex: 0.65,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 26,
    paddingHorizontal: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: "center",
  },
  form: {
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    textAlign: "right",
    borderBottomWidth: 1.0,
    width: 260,
    height: 35,
    marginBottom: 22,
    fontSize: 17,
  },
});

export default Register;
