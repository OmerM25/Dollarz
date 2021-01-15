import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export const CustomText = ({ style }) => {
    const [loaded] = useFonts({
        AlBayan: require('../assets/fonts/AlBayan.ttf'),
    });

    if (!loaded) {
        return "hi";
    }

    return (
        <Text style={{ fontFamily: 'AlBayan' }}></Text>
    )
}
