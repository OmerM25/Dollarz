import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, TextInput, View, FlatList } from "react-native";
import { showMessage } from "react-native-flash-message";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";
import AxiosInstance from "../utils/AxiosInstance";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const imageParents = require("../assets/images/parents.png");

const ChildView = (props) => {
    const [money, setMoney] = useState();
    const [selectedDay, setSelectedDay] = useState("ראשון");
    const [frequency, setFrequency] = useState("יום");
    const [shouldOpenMoneyDialog, setShouldOpenMoneyDialog] = useState(false);

    if (!props.route.params.parent) {
        return <></>;
    }

    const handleAddAllowance = () => {
        AxiosInstance.put("child/addAllowance/" + props.child,
            { allowance: money, day: selectedDay, frequency: frequency }).
            then(response => {
                setShouldOpenMoneyDialog(false);
                showMessage({
                    message: "הכסף הוסף בהצלחה",
                    type: "success",
                    textAlign: "right",
                    duration: 3000,
                    icon: "auto"
                });
            }).catch(err => console.log(err));
    }

    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                            setValue={item => setSelectedDay(item)} />
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
                            setValue={item => setFrequency(item)} />
                        <CustomText style={{ marginTop: 10 }}> בכל</CustomText>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.modalButton}>
                            <Button color="#6C63FC" title="ביטול" onPress={() => setShouldOpenMoneyDialog(!shouldOpenMoneyDialog)} />
                        </View>
                        <View style={styles.modalButton}>
                            <Button color="#6C63FC" title="שמירה" onPress={handleAddAllowance} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
}

export default ChildView;
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
});