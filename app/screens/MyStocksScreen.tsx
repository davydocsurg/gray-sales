import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { BASE_URL } from "../api/constants";
import { LoadingIndicator } from "../components";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import { useAuthContext } from "../contexts/AuthContext";
import routes from "../navigation/routes";

export default function MyStocksScreen({ navigation }: any) {
    const [refreshing, setRefreshing] = useState(false);
    const { authUser, authUserStocks, handleFetchAuthUserStocks } =
        useAuthContext();
    const isFocused = useIsFocused();

    useEffect(() => {
        handleFetchAuthUserStocks();
        //     setTimeout(() => {
        // console.log(authUserStocks);
        //     }, 2500);
    }, [isFocused === true]);

    const handleDelete = (stock: string) => {
        // Delete the message from messages
        // setMessages(messages.filter((m) => m.id !== message.id));
    };

    return (
        <Screen>
            <LoadingIndicator visible={authUser.loading} />
            <FlatList
                data={authUserStocks}
                keyExtractor={(stock) => stock?._id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        borderRadius={15}
                        title={item?.title}
                        subTitle={item?.description}
                        image={{ uri: BASE_URL + item?.images[0].path }}
                        icon="chevron-down"
                        listAction={() => {
                            navigation.navigate(routes.AUTH_USER_STOCKS, item);
                        }}
                        renderActions={() => (
                            <ListItemDeleteAction
                                deleteAction={() => handleDelete(item?._id)}
                            />
                        )}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    handleFetchAuthUserStocks();
                }}
            />
        </Screen>
    );
}
