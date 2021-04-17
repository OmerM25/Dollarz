import React, { useEffect, useState, useRef } from "react";
import { Image, Modal, StyleSheet, TextInput, View, FlatList, ScrollView } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";
import AxiosInstance from "../utils/AxiosInstance";
import { DataTable } from 'react-native-paper';

const Chores = (props) => {
  if (!props.parent && !props.child) {
    return <></>;
  }

  const [chores, setChores] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const getChores = () => {
    AxiosInstance.get('chore', {
      params: {
        chores: props.parent.chores
      }
    }).then(resp => {
      setChores(resp.data);
    });
  }

  const saveNewChore = () => {
    AxiosInstance.post('chore', {
      description: description,
      amount: amount,
      parentId: props.parent._id
    }).then((chore) => {
      setVisibility(!visibility);
      showMessage({
        message: "המטלה נשמרה בהצלחה!",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      });
      setDescription("");
      setAmount("");
      getChores();
    }).catch((err) => {
      setVisibility(!visibility);
      showMessage({
        message: "לא הצלחנו לשמור את המטלה",
        description: "קרתה תקלה.. אולי ננסה שוב מאוחר יותר?",
        type: "danger",
        textAlign: "right",
        duration: 3000,
        icon: "auto",
      });
    })
  }

  const deleteChore = (choreId) => {
    AxiosInstance.delete('chore', {
      params: {
        id: choreId
      }
    }).then(() => {
      showMessage({
        message: "המטלה נמחקה בהצלחה!",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      });
      getChores();
    }).catch((err) => {
      showMessage({
        message: "לא הצלחנו למחוק את המטלה",
        description: "קרתה תקלה.. אולי ננסה שוב מאוחר יותר?",
        type: "danger",
        textAlign: "right",
        duration: 3000,
        icon: "auto",
      });
    });
  }

  let isRendered = useRef(false);
  useEffect(() => {
    isRendered = true;
    getChores();
    return () => {
      isRendered = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CustomText style={styles.headline}>
        המטלות בבית שלנו
      </CustomText>
      <FlatList
        data={chores}
        renderItem={({ item }) => {
          return <View style={{ flexDirection: "row" }}>
            <View style={{ margin: 15 }}>
              <Button onPress={() => deleteChore(item._id)} title="X" color="#FF0000" />
            </View>
            <View style={{ margin: 15 }}>
              <CustomText style={styles.money}>
                {item.amount}
                <CustomText style={styles.moneytype}>
                  ש"ח
      </CustomText>
              </CustomText>
            </View>
            <View style={{ margin: 15 }}>
              <CustomText style={styles.smallHeadline}>
                {item.description}
              </CustomText>
            </View>
          </View>
        }}
        keyExtractor={chore => chore._id}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.modalButton}>
          <Button onPress={() => { setVisibility(!visibility) }} title="הוספת מטלה חדשה" />
        </View>
      </View>
      <View style={styles.header}>
        <Image style={{ width: 200, height: 200 }} source={require("../assets/images/chores.png")} />
      </View>

      <Modal
        transparent={true}
        animationType={"slide"}
        visible={visibility}
        onRequestClose={() => { setVisibility(!visibility) }}
        onBackdropPress={() => { setVisibility(!visibility) }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.ModalInsideView}>
            <CustomText
              style={styles.inputHeadline}>
              שם המטלה
            </CustomText>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input} />
            <CustomText
              style={styles.inputHeadline}>
              תשלום
            </CustomText>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.input} />
            <View style={{ flexDirection: "row" }}>
              <View style={styles.modalButton}>
                <Button color="#6C63FC" title="שמירה" onPress={saveNewChore} />
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

export default Chores;

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
  headline: {
    fontSize: 30,
    marginTop: 15,
    color: '#4525F2'
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
    fontSize: 20,
    marginTop: 10
  },
  moneytype: {
    alignItems: "center",
    fontSize: 10,
    marginRight: 155
  },
  imgPresent: {
    width: 200,
    height: 178,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#4525F2'
  },
  smallHeadline: {
    fontSize: 20,
    marginTop: 15,
    color: '#4525F2'
  },
  text: {
    fontSize: 17,
    textAlign: "center"
  }
});