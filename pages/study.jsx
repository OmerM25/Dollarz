import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomText } from "../common/CustomText";

const Study = () => {
  return (
    <View style={styles.view}>
      <CustomText style={styles.headline}> ידע זה כוח </CustomText>
      <CustomText style={{ marginTop: 30 }}>איזה כיף שבאת דני,</CustomText>
      <CustomText style={styles.textStyle}>ללמוד על כסף יכול להיות ממש כיף עם</CustomText>
      <CustomText style={styles.textStyle}> המשחקים והלומדות שלנו. </CustomText>
      <CustomText style={styles.textStyle}> אז למה אתה מחכה? בוא נתחיל לשחק </CustomText>
    </View>
  );
};

export default Study;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    marginTop: 70,
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#4525F2'
  },
  textStyle: {
    marginTop: 3
  }
});