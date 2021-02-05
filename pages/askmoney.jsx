import React from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Button } from "react-native";
import { CustomText } from "../common/CustomText";


const imgApprove = require("../images/approve.png");
const imgDontApprove = require("../images/dontapprove.png");
const imgWallet = require("../images/wallet.png");

const AskMoney = () => {
  return (
    <View style={styles.view}>
<CustomText style={styles.headline}>
    כמה כסף אתה צריך?
        </CustomText>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
          />
        <CustomText style={styles.headline}>
    בשביל מה?
        </CustomText>
        <TextInput
            style={styles.input}
          />
      <TouchableOpacity style={styles.button} onPress={()=>{alert("הבקשה נשלחה להורים")}}>
      <CustomText style={styles.buttontext}>
    בקש כסף
        </CustomText>
        </TouchableOpacity>
        <Image
        source={imgWallet}
        style={styles.imgWallet} />
    </View>
    );
};

export default AskMoney;

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        marginTop: 90
      },
      button: {
        marginTop:30,
        alignItems: "center",
        borderRadius:30,
        backgroundColor: "#4525F2",
        padding: 10
      },
      moneytype: {
        fontSize: 18
      },
      imgWallet: {
        width: 200,
        height: 178,
        marginTop: 50,
      },
      buttontext: {
        fontSize: 30,
        color: '#FFFFFF',
        marginLeft:10,
        marginRight:10
      },
      headline: {
        fontSize: 30,
        marginTop: 50
      },
      input: {
        marginTop: 20,
        textAlign: "right",
        borderBottomWidth: 1.0,
        width: 260,
        height: 35,
        marginBottom: 30,
        fontSize: 30,
      },
    })