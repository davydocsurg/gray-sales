import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

interface ButtonProps {
    title: string;
    color: string;
    onPress: any;
}

export default function AppButton({ title, color, onPress }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.orange,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,
    },

    text: {
        color: colors.white,
        fontSize: 17,
        textTransform: "capitalize",
        fontWeight: "bold",
    },
});
