import React, { useState } from "react";
import { View, StyleSheet, Modal, TextInput } from "react-native";
import { Button } from "../common/Button";
import { CustomText } from "../common/CustomText";
import AxiosInstance from "../utils/AxiosInstance";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";


const Goal = () => {
  const [visibility, setVisibility] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const saveNewGoal = () => {
    AxiosInstance.post('goals', {
      description: description,
      amount: amount,
      isAchieved: false
    }).then((goal) => {
      setVisibility(!visibility)
      showMessage({
        message: "המטרה נשמרה בהצלחה!",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      });
    }).catch((err) => {
      setVisibility(!visibility)
      showMessage({
        message: "לא הצלחנו לשמור את המטרה",
        description: "קרתה תקלה.. אולי ננסה שוב מאוחר יותר?",
        type: "danger",
        textAlign: "right",
        duration: 3000,
        icon: "auto",
      });
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlashMessage position="top" />
      <CustomText> מטרה אישית לחיסכון </CustomText>
      <Button style={styles.modalButton} onPress={() => { setVisibility(!visibility) }} title="יצירת מטרה חדשה" />


      <Modal
        transparent={true}
        animationType={"slide"}
        visible={visibility}
        onRequestClose={() => { setVisibility(!visibility) }}
        onBackdropPress={() => { setVisibility(!visibility) }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.ModalInsideView}>
            <CustomText style={styles.welcome}>הגיע הזמן להשתדרג!</CustomText>
            <CustomText
              style={styles.inputHeadline}>
              מה נרצה לקנות?
            </CustomText>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input} />
            <CustomText
              style={styles.inputHeadline}>
              כמה זה עולה?
            </CustomText>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.input} />
            <View style={{ flexDirection: "row" }}>
              <View style={styles.modalButton}>
                <Button color="#6C63FC" title="שמירה" onPress={saveNewGoal} />
              </View>
              <View style={styles.modalButton}>
                <Button color="#6C63FC" title="ביטול" onPress={() => { setVisibility(!visibility) }} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({

  ModalInsideView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#63a5fc",
    height: 450,
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
  welcome: {
    fontSize: 25,
    marginBottom: 20,
    color: "white"
  },
  input: {
    height: 40,
    width: 180,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    padding: 5,
    textAlign: "center"
  },
  inputHeadline: {
    fontSize: 18,
    marginBottom: 15,
    color: "white"
  },
  modalButton: {
    margin: 16,
    width: 100,
  },
});
