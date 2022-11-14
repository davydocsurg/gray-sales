import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import colors from "../utils/colors";
import { useNetInfo } from "@react-native-community/netinfo";
import { MonoText } from "./StyledText";

const OfflineNotice = () => {
    const netInfo = useNetInfo();

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
        return (
            <View style={styles.container}>
                <MonoText style={styles.text}>No Internet Connection</MonoText>
            </View>
        );

    return null;
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.primary,
        height: 50,
        justifyContent: "center",
        position: "absolute",
        top: Constants.statusBarHeight,
        width: "100%",
        zIndex: 1,
    },
    text: {
        color: colors.white,
    },
});

export default OfflineNotice;
