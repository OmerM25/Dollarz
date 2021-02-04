import React from "react";
import { View, Text, Image, Button } from "react-native";

const HomeChild = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 45 }}> היי דני! </Text>
      <Text style={{ fontSize: 35 }}> עד עכשיו חסכת </Text>
      <View style={{ alignItems: "flex-start", marginTop: 20 }}>
        <Text style={{ fontSize: 80 }}> 250 </Text>
        <Text style={{ fontSize: 23, marginTop: -12 }}> ש"ח </Text>
      </View>
      <Text style={{ fontSize: 32, marginTop: 20 }}> כל הכבוד! </Text>
      <Text style={{ fontSize: 18, marginTop: 15 }}> דמי הכיס הבאים שלך מגיעים בעוד 4 ימים </Text>
      <Text style={{ fontSize: 18 }}> ואז תקבל עוד 20 ש"ח. איזה כיף! </Text>
      <Image
        style={{ width: 300, height: 250, marginTop: 15, marginBottom: 25 }}
        source={require("../assets/images/pig.png")}
      />
      <Button
        title="אני רוצה להשתמש בכסף"
        color="#4525F2"
        //onPress={/** change state and switch to ASK MONEY component */}
      />
    </View>
  );
};

export default HomeChild;
