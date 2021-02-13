import React from "react";
import { View, Text, Image, Button } from "react-native";

const HomeChild = (props) => {
  if (!props.child) {
    return <></>;
  }

  let daysToAllownce = "3";
  let isThereActiveAllowance =
    props.child.child.allowance.amount !== "0" && props.child.child.allowance.amount !== undefined;

  const calcDaysLeftToAllowance = () => {
    // TODO - calc that checks how many days more left for getting the allowance
  };

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
        <>
          <Text style={{ fontSize: 18, marginTop: 15 }}> דמי הכיס הבאים שלך מגיעים בעוד {daysToAllownce} ימים </Text>
          <Text style={{ fontSize: 18 }}> ואז תקבל עוד {props.child.child.allowance.amount} ש"ח. איזה כיף! </Text>
        </>
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
          props.navigation.navigate("Login");
        }}
      />
    </View>
  );
};

export default HomeChild;
