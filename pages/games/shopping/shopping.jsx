import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { CustomText } from "../../../common/CustomText";
import { CheckBox } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { Button } from "../../../common/Button";
import { productsData } from "./shopping-game-data";
import { ListView } from "react-native";

const Shopping = ({ navigation: { navigate } }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [givenMoney, setGivenMoney] = useState(Math.round(1 + Math.random() * (9 - 1)) * 10);
  let amountOfProductsToWin = 0;
  let maxMoneyUsagePossible = 0;

  useEffect(() => {
    shuffleProducts();
  }, []);

  useEffect(() => {
    amountOfProductsToWin = 0;
    maxMoneyUsagePossible = 0;

    //sort products by price low to high
    const productsSortedByPrice = products ? products.sort((a, b) => (a.price > b.price ? 1 : -1)) : [];

    // check the optimum products amount to win
    productsSortedByPrice.forEach((product) => {
      if (product.price + maxMoneyUsagePossible <= givenMoney) {
        maxMoneyUsagePossible += product.price;
        amountOfProductsToWin++;
      }
    });
  }, [products]);

  const shuffleProducts = () => {
    const shuffledProducts = productsData.sort(() => Math.random() - 0.5);
    setProducts(shuffledProducts);
  };

  const itemPressed = (productName) => {
    let newArray = [...selectedProducts];
    let productIndex = selectedProducts.findIndex((prod) => prod === productName);

    // add is not exist otherwise remove item from selected products array
    productIndex === -1 ? newArray.push(productName) : newArray.splice(productIndex, 1);
    setSelectedProducts(newArray);
    console.log(newArray);
  };

  const checkCart = () => {
    // Check if this is the optimum product selection
    if (amountOfProductsToWin == selectedProducts.length) {
      // let overallCost = selectedProducts.reduce
    }
  };

  const backgroundImage = require("../../../images/shopping_game/background2.png");

  return isGameStarted ? (
    <View style={styles.cont}>
      <View style={styles.gameTitle}>
        <CustomText style={{ fontSize: 40, fontWeight: "bold" }}>התקציב שעומד </CustomText>
        <CustomText style={{ fontSize: 40, fontWeight: "bold" }}> לרשותך - {givenMoney} ש"ח</CustomText>
      </View>
      <ScrollView style={styles.scroller}>
        <View style={styles.gameImages}>
          {products.map((product, index) => {
            // if (amountOfProductsToWin + 4 >= index) {
            //   console.log(index);

            return (
              <View key={product.name}>
                <Text style={{ marginLeft: 70 }}>{product.name}</Text>
                <TouchableOpacity onPress={() => itemPressed(product.name)}>
                  <Image
                    style={
                      selectedProducts.includes(product.name) ? styles.clickedImageStyle : styles.productsImagestyle
                    }
                    source={product.pic}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.finishButton}>
        <Button title="בדוק!" color="#6C63FC" onPress={() => checkCart()}></Button>
        <Button title=" יציאה מהמשחק" color="#6C63FC" onPress={() => navigate("Study")}></Button>
      </View>
    </View>
  ) : (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.view}>
        <CustomText style={styles.introTitle}>משחק קניות</CustomText>
        <CustomText style={styles.introText}>לפנייך תוצג רשימת מוצרים שונים</CustomText>
        <CustomText style={styles.introText}>שיופיעו ללא המחיר שלהם.</CustomText>
        <CustomText style={styles.introText}>עלייך להכניס כמה שיותר מוצרים</CustomText>
        <CustomText style={styles.introText}>לעגלה בתקציב שניתן לך. בהצלחה!</CustomText>
        <View style={{ marginTop: 20 }}>
          <Button title="התחל במשחק" color="#6C63FC" onPress={() => setIsGameStarted(true)}></Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Shopping;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  productsImagestyle: {
    width: 196,
    height: 184,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  clickedImageStyle: {
    width: 196,
    height: 184,
    borderColor: "#cc33ff",
    borderWidth: 3,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  view: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  introText: {
    margin: 5,
    fontSize: 22,
    fontWeight: "bold",
  },
  introTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gameTitle: {
    borderStyle: "solid",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 70,

    backgroundColor: "#e6b3ff",
  },
  gameImages: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  finishButton: {
    marginBottom: 20,
    fontSize: 20,
  },
});
