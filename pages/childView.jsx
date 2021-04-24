import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, TextInput, View, FlatList } from "react-native";
import { showMessage } from "react-native-flash-message";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";
import AxiosInstance from "../utils/AxiosInstance";
const imageParents = require("../assets/images/parents.png");
import axios from 'axios';

const ChildView = (props) => {
    if (!props.route.params.parent) {
        return <></>;
    }

    return <View><CustomText>{props.route.params.child}</CustomText></View>
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