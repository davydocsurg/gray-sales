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
import { Message } from "../types";

const initialMessages = [
    {
        id: 1,
        title: "Lorem Ipsum dolor",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio suscipit veritatis dolorem, magni at fugit iusto vitae aut. Quo ducimus, accusamus expedita ratione nesciunt inventore magni maiores enim! Provident, repellendus.",
        image: require("../assets/images/avatar.jpg"),
    },
    {
        id: 2,
        title: "Dolor Qaecum",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio suscipit veritatis dolorem, magni at fugit iusto vitae aut. Quo ducimus, accusamus expedita ratione nesciunt inventore magni maiores enim! Provident, repellendus.",
        image: require("../assets/images/avatar.jpg"),
    },
];

export default function MyStocksScreen() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);
    const { authUser, handleFetchAuthUserStocks } = useAuthContext();
    const isFocused = useIsFocused();

    useEffect(() => {
        handleFetchAuthUserStocks();
        //     setTimeout(() => {
        //         console.log(authUser.stocks);
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
                data={authUser.stocks!}
                keyExtractor={(stock) => stock._id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={{ uri: BASE_URL + item.images }}
                        listAction={() => {
                            return;
                        }}
                        renderActions={() => (
                            <ListItemDeleteAction
                                deleteAction={() => handleDelete(item._id)}
                            />
                        )}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        {
                            id: 2,
                            title: "T2",
                            description: "D5",
                            image: require("../assets/images/avatar.jpg"),
                        },
                    ]);
                }}
            />
        </Screen>
    );
}
