import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import colors from "../../utils/colors";

export default function ListItemDeleteAction({
    deleteAction,
}: {
    deleteAction: any;
}) {
    return (
        <TouchableWithoutFeedback onPress={deleteAction}>
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name="trash-can"
                    size={35}
                    color={colors.white}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.danger,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
    },
});
