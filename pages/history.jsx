import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";
import { CustomText } from "../common/CustomText";
import AxiosInstance from "../utils/AxiosInstance";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import axios from 'axios';


const imgApprove = require("../images/approve.png");
const imgDontApprove = require("../images/dontapprove.png");
const imgWallet = require("../images/wallet.png");

const History = ({navigation: { navigate }}) => {
  const [visibility, setVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [requestId, setRequestId] = useState("");
  const getLatestRequest = () => {
    AxiosInstance.get('request').then((resp) => {
      setReason(resp.data.reason);
      setAmount((resp.data.amount).toString());
      setRequestId(resp.data._id);
      setShow(true)
    }).catch((err) => {
      
    })
  }

  const approveRequest = () => {
    var reqId = {requestId}.requestId;
    //hardcoded for checking- couldnt get real id... 
    var childId= "6023d0be0ae6fa4784deba2e"; 
    axios.all([
    AxiosInstance.put('request/approve/'+ reqId, {status: '1'}),
    AxiosInstance.put('child/updatemoney/'+ childId, {money: {amount}.amount})
  ])
    .then((resp) => {
      setVisibility(!visibility)
      showMessage({
        message: "הבקשה אושרה בהצלחה",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      })
      navigate("HomeChild");
    }).catch((err) => {
      setVisibility(!visibility)
      showMessage({
        message: "לא הצלחנו לאשר את הבקשה",
        description: "קרתה תקלה.. אולי ננסה שוב מאוחר יותר?",
        type: "danger",
        textAlign: "right",
        duration: 3000,
        icon: "auto",
      });
    })
  }

  const rejectRequest = () => {
    var reqId = {requestId}.requestId;
    
    AxiosInstance.put('request/reject/'+ reqId, {status: '2'}).then((resp) => {
      setVisibility(!visibility)
      showMessage({
        message: "הבקשה נדחתה בהצלחה",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      })
      navigate("HomeChild");
    }).catch((err) => {
      setVisibility(!visibility)
      showMessage({
        message: "לא הצלחנו לדחות את הבקשה",
        description: "קרתה תקלה.. אולי ננסה שוב מאוחר יותר?",
        type: "danger",
        textAlign: "right",
        duration: 3000,
        icon: "auto",
      });
    })
  }

  useEffect(() => {
    getLatestRequest();
  });

  return (show &&
    <View style={styles.view}>
      <CustomText style={styles.headline}>
        דני מבקש לקבל
        </CustomText>
        <CustomText style={styles.money}>
          {amount}
          <CustomText style={styles.moneytype}>
          ש"ח 
        </CustomText>
        </CustomText>
        <CustomText style={styles.headline}>
        בשביל:
        </CustomText>
        <CustomText style={styles.value}>
        {reason}
        </CustomText>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={()=>{rejectRequest()}}>
          <Image source={imgDontApprove}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{approveRequest()}}>
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
