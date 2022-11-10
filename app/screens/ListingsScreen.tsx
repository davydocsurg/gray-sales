import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import listings from "../api/listings";

// locals
import AppButton from "../commons/AppButton";
import AppText from "../commons/AppText";
import Card from "../commons/Card";
import LoadingIndicator from "../components/LoadingIndicator";
import { APIUtils } from "../constants/ApiUtils";
import { fetchStocks } from "../contexts/actions";
import { useStockContext } from "../contexts/StockContext";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import { FetchStocks } from "../services/ListingsService";
import { ListingsApiRes, Stock } from "../types/listings";
import colors from "../utils/colors";

export default function ListingsScreen({ navigation }: any) {
    const { state, dispatch } = useStockContext();
    // const { loading } = state;

    // const getListingsApi = useApi(FetchStocks);
    // const [stocks, setStocks] = useState<ListingsApiRes | any>();

    useEffect(() => {
        setUpStocks();
        console.log(state.stocks);
    }, []);

    const setUpStocks = async () => {
        // const getStocks = await useApi(FetchStocks);
        // setStocks(getStocks.data);
        fetchStocks(dispatch);
    };

    return (
        <SafeAreaView>
            {state?.errors && (
                <Screen style={styles.error}>
                    <AppText>Couldn't fetch listings.</AppText>
                    <AppButton
                        title="Retry"
                        color={colors.orange}
                        onPress={fetchStocks}
                    />
                </Screen>
            )}
            <Screen style={styles.animation}>
                <LoadingIndicator visible={state?.loading} />
            </Screen>
            <Screen style={styles.screen}>
                <FlatList
                    data={state?.stocks}
                    keyExtractor={(stock: Stock) => stock?._id.toString()}
                    renderItem={({ item }: any) => (
                        <Card
                            title={item?.title}
                            description={"$" + item?.price}
                            imageUrl={{
                                uri: APIUtils.localHost + item?.images,
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
