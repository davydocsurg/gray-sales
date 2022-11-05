import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import { getListings } from "../api/listings";
import Card from "../commons/Card";
import { routes } from "../navigation";
import { ListingsApiRes } from "../types/listings";
import colors from "../utils/colors";

const listings = [
    {
        id: 1,
        title: "Red jacket for sale",
        price: 100,
        image: require("../assets/images/jacket.jpg"),
    },
    {
        id: 2,
        title: "Couch in great condition",
        price: 1000,
        image: require("../assets/images/couch.jpg"),
    },
];

export default function ListingsScreen({ navigation }: any) {
    const [listings, setListings] = useState<ListingsApiRes | any>();

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = async () => {
        const response = await getListings();

        setListings(response?.data?.data.stocks);
    };

    return (
        <SafeAreaView>
            <Screen
                style={[
                    styles.screen,
                    { marginTop: Platform.OS === "ios" ? 50 : 0 },
                ]}
            >
                <FlatList
                    data={listings}
                    keyExtractor={(listing) => listing?._id.toString()}
                    renderItem={({ item }) => (
                        <Card
                            title={item?.title}
                            description={"$" + item?.price}
                            image={require("../assets/images/jacket.jpg")}
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
});
