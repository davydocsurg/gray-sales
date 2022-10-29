import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppText from "../commons/AppText";
import ListItem from "../components/ListItem";
import colors from "../utils/colors";

export default function ListingDetailsScreen() {
    return (
        <View>
            <Image
                style={styles.image}
                source={require("../assets/images/landing-bg.jpg")}
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>Lorem ipsum</AppText>
                <AppText style={styles.price}>$100</AppText>

                <ListItem
                    image={require("../assets/images/chair.jpg")}
                    title="Lorem Ipsum"
                    subTitle="5 Listings"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
});
