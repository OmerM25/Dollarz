import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, TextInput, View, FlatList } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";
import AxiosInstance from "../utils/AxiosInstance";
const imgGoal = require("../assets/images/Ellipse 44.png");
import axios from 'axios';

const ChildView = (props) => {
    if (!props.route.params.parent) {
        return <></>;
    }
    let child = props.route.params.child;
    console.log(child);

    const [goalDescription, setGoalDescription] = useState("");
    const [goalAmount, setGoalAmount] = useState("");

    const getLatestGoal = () => {
        console.log(child.user._id);
        AxiosInstance.get('goals/byChild', {
            params: {
                childId: child.user._id
            }
        }).then((resp) => {
            setGoalDescription(resp.data.description);
            setGoalAmount(resp.data.amount);
        })
    }

    useEffect(() => {
        getLatestGoal();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <FlashMessage />
            <CustomText style={styles.headline}>
                החיסכון של {child.user.name}
            </CustomText>
            <CustomText style={styles.money}>
                {child.child.money}
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
                <Button onPress={() => {
                }} title="עדכון דמי כיס" />
            </View>
            <CustomText style={styles.smallHeadline}>
                גרף התקדמות
            </CustomText>
        </View>
    );
}

export default ChildView;

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
    plusButtonView: {
        margin: 13,
        marginTop: 25,
        width: 30,
        borderRadius: 40
    },
    plusButton: {
        borderRadius: 20
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
        fontSize: 30,
        marginTop: 10
    },
    moneytype: {
        alignItems: "center",
        fontSize: 18,
        marginRight: 5
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
    table: {
        height: 330,
        marginTop: 60,
        marginLeft: 40
    },
    text: {
        fontSize: 17,
        textAlign: "center"
    },
    imgParents: {
        width: 230,
        height: 200,
        marginBottom: 30,
        marginTop: 20
    }
});