import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, View, Image, TextInput, TouchableOpacity,SafeAreaView} from "react-native";
import { CustomText } from "../common/CustomText";
import MaterialTabs from 'react-native-material-tabs';
import { DataTable } from 'react-native-paper';
import AxiosInstance from "../utils/AxiosInstance";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import axios from 'axios';

const imgApprove = require("../images/smallapprove.png");
const imgDontApprove = require("../images/smalldontapprove.png");
const imgHistory = require("../images/history.png");

const childHistory = ({navigation: { navigate }}) => {
    const [selectedTab, setSelectedTab] = useState(3);
  return (
    <View>
        <View style={styles.view}>
<CustomText style={styles.headline}>
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
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>קניון עם רועי</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>שוקולדים</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgDontApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>קניון עם רועי</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>שוקולדים</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgDontApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>קניון עם רועי</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>שוקולדים</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgDontApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>קניון עם רועי</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>10.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgApprove}/></DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>40 ש"ח</CustomText></DataTable.Cell>
    <DataTable.Cell style={{flex: 3}}> <CustomText style={styles.value}>שוקולדים</CustomText> </DataTable.Cell>
    <DataTable.Cell style={{flex: 2}}><CustomText style={styles.date}>14.12.21</CustomText></DataTable.Cell> 
    <DataTable.Cell><Image source={imgDontApprove}/></DataTable.Cell>
    </DataTable.Row>
  </DataTable>
  </ScrollView>
  <Image
        source={imgHistory}
        style={styles.imgHistory} />
    </View>
  );
};

export default childHistory;

const styles = StyleSheet.create({
  headline: {
 fontSize: 30,
    marginTop: 80,
    color:'#4525F2'
  },
  value: {
    fontSize: 19,
    color:'#020000'
  },
  view: {
    alignItems: "center"
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
  imgHistory: {
    marginTop: 550,
    marginLeft:40,
    position:'absolute'
  },
})
