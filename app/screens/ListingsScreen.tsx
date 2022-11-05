import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import { getListings } from "../api/listings";
import AppButton from "../commons/AppButton";
import AppText from "../commons/AppText";
import Card from "../commons/Card";
import { APIUtils } from "../constants/ApiUtils";
import { routes } from "../navigation";
import { ListingsApiRes } from "../types/listings";
import colors from "../utils/colors";

export default function ListingsScreen({ navigation }: any) {
    const [listings, setListings] = useState<ListingsApiRes | any>();
    const [error, setError] = useState<Boolean>(false);

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = async () => {
        const response = await getListings();
        if (!response.ok) {
            setError(true);
        }

        setListings(response?.data?.data.stocks);
    };

    return (
        <SafeAreaView>
            {error && (
                <Screen style={styles.error}>
                    <AppText>Couldn't fetch listings.</AppText>
                    <AppButton
                        title="Retry"
                        color={colors.orange}
                        onPress={loadListings}
                    />
                </Screen>
            )}
            <Screen style={[styles.screen]}>
                <FlatList
                    data={listings}
                    keyExtractor={(listing) => listing?._id.toString()}
                    renderItem={({ item }) => (
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
});
