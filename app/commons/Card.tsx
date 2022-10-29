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
    subtitle: any;
    image?: any;
}) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailsContainer}>
                <AppText style={{ fontWeight: "700" }}>{title}</AppText>
                <AppText style={[styles.subTitle]}>{subtitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        // padding: 10,
        overflow: "hidden",
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
    },

    image: {
        borderRadius: 10,
        width: "100%",
        height: 200,
    },

    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
    },

    detailsContainer: {
        padding: 20,
    },
});
