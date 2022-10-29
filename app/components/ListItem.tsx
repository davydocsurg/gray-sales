import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AppText from "../commons/AppText";
import colors from "../utils/colors";

export default function ListItem({
    image,
    title,
    subTitle,
}: {
    image?: any;
    title: string;
    subTitle: string;
}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color: colors.secondary,
    },
    title: {
        fontWeight: "500",
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
    },
});
