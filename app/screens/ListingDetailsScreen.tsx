import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { BASE_URL } from "../api/constants";
import AppText from "../commons/AppText";
import ListItem from "../components/lists/ListItem";
import { APIUtils } from "../constants/ApiUtils";
import { fetchStockOwner } from "../contexts/actions";
import { useStockContext } from "../contexts/StockContext";
import { AuthUserDetails } from "../types";
import colors from "../utils/colors";

export default function ListingDetailsScreen({ route }: any) {
    const listing = route.params;
    const { stockDispatch } = useStockContext();
    const isFocused = useIsFocused();
    const [stockOwner, setstockOwner] = useState<AuthUserDetails>();

    useEffect(() => {
        getOwner();
    }, [isFocused === true]);

    const getOwner = async () => {
        const stockOwner = await fetchStockOwner(stockDispatch, listing.user);
        setstockOwner(stockOwner?.data?.user);
    };

    return (
        <View>
            <Image
                style={styles.image}
                source={{ uri: BASE_URL + listing?.images[0].path }}
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.description}>
                    {listing.description}
                </AppText>
                <AppText style={styles.price}>${listing.price}</AppText>

                <ListItem
                    image={{ uri: BASE_URL + stockOwner?.photo }}
                    title={stockOwner?.name!}
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
    description: {
        fontSize: 14,
        fontWeight: "300",
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
});
