import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppText from "../commons/AppText";
import ListItem from "../components/lists/ListItem";
import { APIUtils } from "../constants/ApiUtils";
import colors from "../utils/colors";

export default function ListingDetailsScreen({ route }: any) {
    const listing = route.params;

    return (
        <View>
            <Image
                style={styles.image}
                source={{ uri: APIUtils.localHost + listing?.images }}
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>

                <ListItem
                    imageUrl={require("../assets/images/avatar.jpg")}
                    title="David Avas"
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
