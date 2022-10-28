// import { Text, TextProps } from "./Themed";

import { Platform, StyleSheet, Text } from "react-native";

export function MonoText({ children, style }: { children: any; style: any }) {
    return (
        // <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
        <Text style={[styles.text, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
});
