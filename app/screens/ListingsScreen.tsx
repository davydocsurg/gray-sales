import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import { RootStackScreenProps } from "../../types";
import { BASE_URL } from "../api/constants";

// locals
import AppButton from "../commons/AppButton";
import AppText from "../commons/AppText";
import Card from "../commons/Card";
import LoadingIndicator from "../components/LoadingIndicator";
import { fetchStocks } from "../contexts/actions";
import { useStockContext } from "../contexts/StockContext";
import routes from "../navigation/routes";
import { RootStackParamList } from "../navigation/types";
import { ListingsApiRes, Stock } from "../types/listings";
import colors from "../utils/colors";

type ListingsProps = StackScreenProps<RootStackParamList, "Listings">;

const ListingsScreen = ({ navigation }: any) => {
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
        return (
            <Screen style={styles.animation}>
                <LoadingIndicator visible={stockState?.loading} />
            </Screen>
        );
    } else if (
        stockState.stocks?.length < 1 ||
        stockState.stocks == undefined
    ) {
        return (
            <Screen style={styles.emptyStockContainer}>
                <MaterialCommunityIcons
                    name="flask-empty-minus-outline"
                    size={60}
                    color={colors.orange}
                    style={styles.emptyIcon}
                />
                <Text style={styles.emptyStock}>No Stocks found!</Text>
            </Screen>
        );
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
                                    uri: BASE_URL + item?.images[0].path,
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
};

const styles = StyleSheet.create({
    safeArea: {
        // paddingTop: 30,
        backgroundColor: colors.gray,
    },
    screen: {
        paddingHorizontal: 20,
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

    emptyStockContainer: {
        justifyContent: "center",
        flex: 1,
    },

    emptyStock: {
        color: colors.brown,
        alignSelf: "center",
        fontSize: 30,
        fontWeight: "bold",
    },

    emptyIcon: {
        alignSelf: "center",
    },
});

export default ListingsScreen;
