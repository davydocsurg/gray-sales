import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import colors from "../utils/colors";

const UserProfileScreen = () => {
    return <ScrollView style={styles.screen}></ScrollView>;
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {},
});

export default UserProfileScreen;
