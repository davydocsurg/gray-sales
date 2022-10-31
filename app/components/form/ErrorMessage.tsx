import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../../commons/AppText";

export default function ErrorMessage({ error, visible }: any) {
    if (!visible || !error) return null;

    return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
    error: { color: "red" },
});
