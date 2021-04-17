import React, { useEffect, useState, useRef } from "react";
import { Image, Modal, StyleSheet, TextInput, View, FlatList, ScrollView } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { CustomText } from "../common/CustomText";
import { Button } from "../common/Button";
import AxiosInstance from "../utils/AxiosInstance";
import { DataTable } from 'react-native-paper';

const HomeParent = (props) => {
    if (!props.parent) {
        return <></>;
    }

    const [children, setChildren] = useState([]);

    const getChildren = () => {
        props.parent.children.forEach(child => {
            AxiosInstance.post('child', { childId: child }).then(resp => {
                let currChildren = children;
                children.push(resp.data);
                setChildren(currChildren);
            })
        });
    }

    useEffect(() => {
        getChildren();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <CustomText style={styles.headline}>מצב הילדים שלי</CustomText>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.modalButton}>
                    <Button onPress={() => { }} title="הורד לכולם" />
                </View>
                <View style={styles.modalButton}>
                    <Button onPress={() => { }} title="הוסף לכולם" />
                </View>
            </View>
            <DataTable>
                {children.map((child, index) => {
                    return (
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 2 }}><CustomText>{child.user.name}</CustomText></DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}><CustomText>{child.child.money}</CustomText></DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
            <View style={styles.modalButton}>
                <Button onPress={() => {
                    props.navigation.navigate("RegisterChild");
                }} title="הוספת ילד" />
            </View>

        </View>
    );
};

export default HomeParent;

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
    }
});