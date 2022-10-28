import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../utils/colors";
import AppText from "./AppText";

export default function Card({
    title,
    subtitle,
    image,
}: {
    title: string;
    subtitle: string;
    image?: string;
}) {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={require("../assets/images/landing-bg.jpg")}
            />
            <AppText style={{ fontWeight: "700" }}>{title}</AppText>
            <AppText>{subtitle}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
    },

    image: {
        width: "100%",
        height: 200,
    },
});
