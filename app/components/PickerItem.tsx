import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../commons/AppText";

export default function PickerItem({ label, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText style={styles.text}>{label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
    },
});
