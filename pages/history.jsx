import React from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";
import { CustomText } from "../common/CustomText";

const imgApprove = require("../images/approve.png");
const imgDontApprove = require("../images/dontapprove.png");
const imgWallet = require("../images/wallet.png");

const History = () => {
  return (
    <View style={styles.view}>
      <CustomText style={styles.headline}>
        דני מבקש לקבל
        </CustomText>
        <CustomText style={styles.money}>
          20 
          <CustomText style={styles.moneytype}>
          ש"ח 
        </CustomText>
        </CustomText>
        <CustomText style={styles.headline}>
        בשביל:
        </CustomText>
        <CustomText style={styles.value}>
        לקנות פיצה עם רועי
        </CustomText>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={()=>{alert("לא אישרת")}}>
          <Image source={imgDontApprove}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{alert("אישרת")}}>
          <Image source={imgApprove}/>
        </TouchableOpacity>
        </View>  
        <Image
        source={imgWallet}
        style={styles.imgWallet} />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  headline: {
    fontSize: 30,
    marginTop: 15,
    color:'#4525F2'
  },
  value: {
    fontSize: 30,
    marginTop: 15
  },
  view: {
    alignItems: "center",
    marginTop: 120
  },
  money: {
    alignItems: "center",
    fontSize: 60,
    marginTop: 10
  },
  moneytype: {
    alignItems: "center",
    fontSize: 18,
   marginRight: 5
  },
  imgApprove: {
    marginTop: 35,
    marginRight: 180,
  },
  imgDontApprove: {
    marginLeft: 180,
  },
  button: {
    marginTop: 40,
    margin: 60,
  },
  imgWallet: {
    width: 200,
    height: 178,
    marginTop: 180,
  },
})
