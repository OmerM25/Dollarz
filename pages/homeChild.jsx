import React, { useState } from "react";
import { View, Text, Image, Modal, StyleSheet, TextInput } from "react-native";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";

// calc that checks how many days more left for getting the allowance
// The date should be in format YYYY/MM/dd
// The frequency should be in days
const calcDaysLeftToAllowance = (props) => {
  let correntDate = new Date();
  var beginDate = new Date(props.child.child.allowance.beginDate);
  var endDate = new Date(props.child.child.allowance.endDate);

  // If there isn't allowance or the end date has passed
  if (beginDate == "" || correntDate >= endDate) {
    isThereActiveAllowance = false;
    return null;
  }

  if (correntDate > beginDate) {
    // Get date diff in days
    var dateDiff = Math.floor((correntDate - beginDate) / (1000 * 60 * 60 * 24));
    return props.child.child.allowance.frequency - (dateDiff % props.child.child.allowance.frequency);
  }
};

const HomeChild = (props) => {

  if (!props.child) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      </View>
    )
  }

  // let daysToAllownce = calcDaysLeftToAllowance(props);
  // let isThereActiveAllowance =
    // props.child.child.allowance.amount !== "0" && props.child.child.allowance.amount !== undefined;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 45 }}> היי {props.child.user.name} ! </Text>
      <Text style={{ fontSize: 35 }}> עד עכשיו חסכת </Text>
      <View style={{ alignItems: "flex-start", marginTop: 20 }}>
        <Text style={{ fontSize: 80 }}> {props.child.child.money} </Text>
        <Text style={{ fontSize: 23, marginTop: -12 }}> ש"ח </Text>
      </View>
      <Text style={{ fontSize: 32, marginTop: 20 }}> כל הכבוד! </Text>
      {isThereActiveAllowance ? (
        daysToAllownce == props.child.child.allowance.frequency ? (
          <>
            <Text style={{ fontSize: 18, marginTop: 15 }}> דמי הכיס שלך מגיעים היום. איזה כיף! </Text>
            <Text style={{ fontSize: 18 }}> קיבלת עוד {props.child.child.allowance.amount} ש"ח. </Text>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 18, marginTop: 15 }}> דמי הכיס הבאים שלך מגיעים בעוד {daysToAllownce} ימים </Text>
            <Text style={{ fontSize: 18 }}> ואז תקבל עוד {props.child.child.allowance.amount} ש"ח. איזה כיף! </Text>
          </>
        )
      ) : (
        <></>
      )}

      <Image
        style={{ width: 300, height: 250, marginTop: 15, marginBottom: 25 }}
        source={require("../assets/images/pig.png")}
      />
      <Button
        title="אני רוצה להשתמש בכסף"
        color="#4525F2"
        onPress={() => {
          props.navigation.navigate("AskMoney");
        }}
      />
    </View>
  );
};



export default HomeChild;

