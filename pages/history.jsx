import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, View, Image, TextInput, TouchableOpacity,SafeAreaView } from "react-native";
import { CustomText } from "../common/CustomText";
import AxiosInstance from "../utils/AxiosInstance";
import MaterialTabs from 'react-native-material-tabs';
import { DataTable } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import axios from 'axios';


const imgApprove = require("../images/approve.png");
const imgDontApprove = require("../images/dontapprove.png");
const imgWallet = require("../images/wallet.png");
const imgsmallApprove = require("../images/smallapprove.png");
const imgsmallDontApprove = require("../images/smalldontapprove.png");
const imgHistory = require("../images/history.png");

const History = ({navigation: { navigate }}) => {
  const [visibility, setVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [childTz, setChildTz] = useState("");
  const [childName, setChildName] = useState("");
  const [requestId, setRequestId] = useState("");
  const getLatestRequest = () => {
    AxiosInstance.get('request').then((resp) => {
      setReason(resp.data.reason);
      setAmount((resp.data.amount).toString());
      setRequestId(resp.data._id);
      setChildTz((resp.data.childId).toString());
      setShow(true)
    }).catch((err) => {
      
    })
  }
  const getRequestChildName = () => {
    AxiosInstance.get('user/getUserByTz/'+ {childTz}.childTz).then((resp) => {
      setChildName(resp.data.name);
    }).catch((err) => {
      
    })
  }

  const approveRequest = () => {
    var reqId = {requestId}.requestId;
    var childTzId= {childTz}.childTz;
    var moneyChange = Math.abs({amount}.amount)*-1;
    axios.all([
   AxiosInstance.put('request/approve/'+ reqId, {status: '1'}),
   AxiosInstance.put('child/updatemoney/'+ childTzId, {money: moneyChange})
  ])
    .then((resp) => {
      setShow(!show)
      setVisibility(!visibility)
      showMessage({
        message: "הבקשה אושרה בהצלחה",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      })
     // navigate("HomeChild");
    }).catch((err) => {
      setShow(!show)
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
      setShow(!show)
      setVisibility(!visibility)
      showMessage({
        message: "הבקשה נדחתה בהצלחה",
        type: "success",
        textAlign: "right",
        duration: 3000,
        icon: "auto"
      })
    //  navigate("HomeChild");
    }).catch((err) => {
      setShow(!show)
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
    getRequestChildName();
  },[show]);
  const [selectedTab, setSelectedTab] = useState(3);
  return (<View>{show? (
    <View style={styles.view}>
      <CustomText style={styles.headline}>
        {childName} מבקש לקבל
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
  ):(
    //TODO: seperate it to components
    <View>
    <View style={{alignItems: "center"}}>
<CustomText style={styles.historyheadline}>
         היסטורית הבקשות שלי</CustomText>
         </View>
<SafeAreaView style={styles.container}>
  <MaterialTabs
    items={['בהמתנה', 'נדחו', 'אושרו', 'הכל']}
    selectedIndex={selectedTab}
    onChange={setSelectedTab}
    barColor="#a89af5"
    indicatorColor="#4525F2"
    activeTextColor="black"
    textStyle={{fontSize: 16,fontFamily: 'VarelaRound'}}
  />
</SafeAreaView>
<ScrollView style={styles.table}>
<DataTable>

<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>קניון עם רועי</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>שוקולדים</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallDontApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>קניון עם רועי</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>שוקולדים</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallDontApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>קניון עם רועי</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>שוקולדים</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallDontApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>קניון עם רועי</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallApprove}/></DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
<DataTable.Cell style={{flex: 3}}> <CustomText style={styles.tablevalue}>שוקולדים</CustomText> </DataTable.Cell>
<DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
<DataTable.Cell><Image source={imgsmallDontApprove}/></DataTable.Cell>
</DataTable.Row>
</DataTable>
</ScrollView>
<Image
    source={imgHistory}
    style={styles.imgHistory} />
</View>


  )}
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
  historyheadline: {
    fontSize: 30,
       marginTop: 80,
       color:'#4525F2'
     },
     tablevalue: {
       fontSize: 19,
       color:'#020000'
     },
     container: {
       marginTop: 20,
       flex: 1,
     },
     table: {
         height:330,
       marginTop: 60,
       marginLeft: 40
     },
     date: {
       alignItems: "center",
       fontSize: 15
     },
     imgHistory: {
       marginTop: 550,
       marginLeft:40,
       position:'absolute'
     },
})
