import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { BASE_URL } from "../api/constants";
import AppText from "../commons/AppText";
import colors from "../utils/colors";

const AuthUserStockDetails = ({ route }: any) => {
    const stock = route.params;

    return (
        <View>
            <Image
                style={styles.image}
                source={{ uri: BASE_URL + stock?.images[0].path }}
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{stock.title}</AppText>
                <AppText style={styles.description}>
                    {stock.description}
                </AppText>
                <AppText style={styles.price}>${stock.price}</AppText>

                {/* <ListItem
                    image={{
                        uri: BASE_URL + stockOwner?.photo.replace("public", ""),
                    }}
                    title={stockOwner?.name!}
                    subTitle={`${stocksCount!} ${
                        +stocksCount! > 1 ? "listings" : "stock"
                    }`}
                    borderRadius={22}
                /> */}
            </View>
        </View>
    );
};

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

export default AuthUserStockDetails;
