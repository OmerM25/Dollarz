import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export const CustomText = ({ children, style }) => {
    const [loaded] = useFonts({
        VarelaRound: require('../assets/fonts/VarelaRound-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <Text style={{ ...style, fontFamily: 'VarelaRound' }}>{children}</Text>
    )
}
