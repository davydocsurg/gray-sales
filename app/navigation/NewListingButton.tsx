import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../utils/colors";

interface Props {
    onPress: any;
}

const NewListingButton = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name="plus-circle"
                    color={colors.white}
                    size={40}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.orange,
        borderColor: colors.white,
        borderRadius: 40,
        borderWidth: 10,
        bottom: 20,
        height: 80,
        justifyContent: "center",
        width: 80,
    },
});

export default NewListingButton;
