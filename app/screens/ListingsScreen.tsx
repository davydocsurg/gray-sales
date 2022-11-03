import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import Card from "../commons/Card";
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
    return (
        <SafeAreaView>
            <Screen style={styles.screen}>
                <FlatList
                    data={listings}
                    keyExtractor={(listing) => listing.id.toString()}
                    renderItem={({ item }) => (
                        <Card
                            title={item.title}
                            description={"$" + item.price}
                            image={item.image}
                            onPress={() =>
                                navigation.navigate("ListingDetails", item)
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
