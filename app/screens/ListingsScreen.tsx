import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import { BASE_URL } from "../api/constants";

// locals
import AppButton from "../commons/AppButton";
import AppText from "../commons/AppText";
import Card from "../commons/Card";
import LoadingIndicator from "../components/LoadingIndicator";
import { fetchStocks } from "../contexts/actions";
import { useStockContext } from "../contexts/StockContext";
import routes from "../navigation/routes";
import { ListingsApiRes, Stock } from "../types/listings";
import colors from "../utils/colors";

export default function ListingsScreen({ navigation }: any) {
    const { stockState, stockDispatch } = useStockContext();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setUpStocks();
        }
    }, [isFocused === true]);

    const setUpStocks = async () => {
        await fetchStocks(stockDispatch);
    };

    if (stockState?.errors) {
        return (
            <Screen style={styles.error}>
                <AppText>Couldn't fetch listings.</AppText>
                <AppButton
                    title="Retry"
                    color={colors.orange}
                    onPress={fetchStocks}
                />
            </Screen>
        );
    } else if (stockState?.loading) {
        <Screen style={styles.animation}>
            <LoadingIndicator visible={stockState?.loading} />
        </Screen>;
    } else if (stockState.stocks?.length < 1) {
        <Screen style={styles.animation}>
            <Text>No Stocks found!</Text>
        </Screen>;
    } else
        return (
            <SafeAreaView style={styles.safeArea}>
                <Screen style={styles.screen}>
                    <FlatList
                        data={stockState?.stocks}
                        keyExtractor={(stock: Stock) => stock?._id.toString()}
                        renderItem={({ item }: any) => (
                            <Card
                                title={item?.title}
                                description={"$" + item?.price}
                                imageUrl={{
                                    uri: BASE_URL + item?.images,
                                }}
                                onPress={() =>
                                    navigation.navigate(
                                        routes.LISTING_DETAILS,
                                        item
                                    )
                                }
                            />
                        )}
                        // refreshing={getListingsApi.loading}
                        // onRefresh={() => getListingsApi.request()}
                    />
                </Screen>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: 30,
        backgroundColor: colors.gray,
    },
    screen: {
        padding: 20,
        backgroundColor: colors.gray,
    },

    error: {
        padding: 35,
        paddingTop: 80,
        alignItems: "center",
        justifyContent: "center",
    },

    animation: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 480,
    },
});
