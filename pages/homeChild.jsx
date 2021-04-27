import React, { useState } from "react";
import { View, Text, Image, Modal, StyleSheet, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [shouldOpenMoneyDialog, setShouldOpenMoneyDialog] = useState(false);
  const [money, setMoney] = useState();
  const [selectedDay, setSelectedDay] = useState("ראשון");
  const [frequency, setFrequency] = useState("יום");
  if (!props.child) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Button onPress={() => { setShouldOpenMoneyDialog(!shouldOpenMoneyDialog) }} title="עדכן דמי כיס" />
        </View>
        <Modal
          transparent={true}
          animationType={"slide"}
          visible={shouldOpenMoneyDialog}
          onRequestClose={() => { setShouldOpenMoneyDialog(!shouldOpenMoneyDialog) }}
          onBackdropPress={() => { setShouldOpenMoneyDialog(!shouldOpenMoneyDialog) }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.ModalInsideView}>
              <CustomText style={styles.headline}>סכום דמי הכיס</CustomText>
              <View styles={styles.moneyInput}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  value={money}
                  onChangeText={(money) => setMoney(money)}
                />
                <CustomText style={{ position: 'relative', bottom: 20 }}>ש"ח</CustomText>
              </View>
              <View style={{ flexDirection: "row", zIndex: 10 }}>
                <DropDownPicker
                  defaultValue={selectedDay}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  containerStyle={{ height: 40, width: 120, marginRight: 20 }}
                  style={{ backgroundColor: '#fafafa' }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  items={[{ label: 'ראשון', value: "ראשון", selected: true },
                  { label: 'שני', value: "שני" },
                  { label: 'שלישי', value: "שלישי" },
                  { label: 'רביעי', value: "רביעי" },
                  { label: 'חמישי', value: "חמישי" },
                  { label: 'שישי', value: "שישי" },
                  { label: 'שבת', value: "שבת" }]}
                  onChangeItem={item => setSelectedDay(item)} />
                <CustomText>בימי</CustomText>
              </View>
              <View style={{ flexDirection: "row", zIndex: 9 }}>
                <DropDownPicker
                  defaultValue={frequency}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  style={{ backgroundColor: '#fafafa' }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  containerStyle={{ height: 40, width: 120, marginRight: 20, marginTop: 10 }}
                  items={[{ label: 'יום', value: "יום", selected: true },
                  { label: 'שבוע', value: "שבוע" },
                  { label: 'חודש', value: "חודש" }]}
                  onChangeItem={item => setFrequency(item)} />
                <CustomText style={{ marginTop: 10 }}> בכל</CustomText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.modalButton}>
                  <Button color="#6C63FC" title="ביטול" onPress={() => setShouldOpenMoneyDialog(!shouldOpenMoneyDialog)} />
                </View>
                <View style={styles.modalButton}>
                  <Button color="#6C63FC" title="שמירה" onPress={() => setShouldOpenMoneyDialog(!shouldOpenMoneyDialog)} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  let daysToAllownce = calcDaysLeftToAllowance(props);
  let isThereActiveAllowance =
    props.child.child.allowance.amount !== "0" && props.child.child.allowance.amount !== undefined;

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

const styles = StyleSheet.create({

  ModalInsideView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    height: 350,
    width: '80%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  headline: {
    marginBottom: 50,
    fontSize: 30,
    color: "#3A23CD"
  },
  input: {
    textAlign: "center",
    borderBottomWidth: 1.0,
    width: 200,
    fontSize: 17,
    position: 'relative',
    bottom: 20
  },
  moneyInput: {
    flexDirection: 'row'
  },
  modalButton: {
    width: 100,
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16
  },
})