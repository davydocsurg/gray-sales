import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TextProps, StyleSheet, TextInput } from "react-native";

import defaultStyles from "../utils/styles";

type otherProps = {
    children: TextProps;
};

export default function AppTextInput({
    icon,
    placeholder,
    ...otherProps
}: {
    icon: any;
    placeholder?: string;
    otherProps?: otherProps;
}): JSX.Element {
    return (
        <View style={styles.container}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={defaultStyles.colors.medium}
                    style={styles.icon}
                />
            )}
            <TextInput style={defaultStyles.text} placeholder={placeholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
});
