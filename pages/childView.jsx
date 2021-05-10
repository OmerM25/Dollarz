import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, TextInput, View, FlatList } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";
import AxiosInstance from "../utils/AxiosInstance";
const imgGoal = require("../assets/images/goal.png");
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
    let child = props.route.params.child;

    const [goalDescription, setGoalDescription] = useState("");
    const [goalAmount, setGoalAmount] = useState("");

    const getLatestGoal = () => {
        AxiosInstance.get('goals/byChild', {
            params: {
                childId: child.child._id
            }
        }).then((resp) => {
            setGoalDescription(resp.data.description);
            setGoalAmount(resp.data.amount);
        })
    }

    const getInfoForGraph = () => {
        AxiosInstance.get('moneyHistory/monthly', {
            params: {
                childId: child.user._id
            }
        }).then((resp) => {
            console.log(resp.data);
        })
    }


    useEffect(() => {
        getLatestGoal();
        getInfoForGraph();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <FlashMessage />
            <CustomText style={styles.headline}>
                החיסכון של {child.user.name}
            </CustomText>
            <CustomText style={styles.money}>
                {child.child.money + " "}
                <CustomText style={styles.moneytype}>
                    ש"ח
            </CustomText>
            </CustomText>
            <Image source={imgGoal}></Image>
            <CustomText style={styles.minorHeadline}>
                {goalDescription ? goalDescription : "לא הוגדרה מטרה"}
            </CustomText>
            <CustomText style={styles.value}>
                <CustomText style={styles.moneytype}>
                    {goalAmount ? goalAmount + 'ש"ח' : null}
                </CustomText>
            </CustomText>
            <CustomText style={styles.smallHeadline}>
                דמי כיס
            </CustomText>
            <CustomText>
                {child.child.allowance.amount ? child.child.allowance.amount + 'ש"ח' : "אין"}
            </CustomText>
            <View style={styles.modalButton}>
                <Button onPress={() => { setShouldOpenMoneyDialog(!shouldOpenMoneyDialog) }} title="עדכן דמי כיס" />
            </View>
            <CustomText style={styles.smallHeadline}>
                גרף התקדמות
            </CustomText>
            <Modal
                transparent={true}
                animationType={"slide"}
                visible={shouldOpenMoneyDialog}
                onRequestClose={() => { setShouldOpenMoneyDialog(!shouldOpenMoneyDialog) }}
                onBackdropPress={() => { setShouldOpenMoneyDialog(!shouldOpenMoneyDialog) }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.ModalInsideView}>
                        <CustomText style={styles.modalHeadline}>סכום דמי הכיס</CustomText>
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
    );
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
        marginBottom: 20,
        fontSize: 30,
        color: "#3A23CD"
    },
    modalHeadline: {
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
    smallHeadline: {
        fontSize: 20,
        marginTop: 15,
        color: '#4525F2',
        fontWeight: "bold"
    },
    minorHeadline: {
        fontSize: 20,
        marginTop: 15,
        color: '#4525F2'
    },
    date: {
        alignItems: "center",
        fontSize: 15
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
    money: {
        alignItems: "center",
        fontSize: 30,
        marginTop: 10
    },
});