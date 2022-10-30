import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../commons/Card";
import colors from "../utils/colors";

export default function SalesList() {
    return (
        <View style={styles.container}>
            <Card
                title="Lorem"
                description="$100"
                image={require("../assets/images/chair.jpg")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray,
        padding: 20,
        paddingTop: 100,
        flex: 1,
    },
});
