import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export default function Screen({
    children,
    style,
}: {
    children: JSX.Element | JSX.Element[];
    style?: any;
}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={[style, styles.view]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    view: {
        flex: 1,
    },
});
