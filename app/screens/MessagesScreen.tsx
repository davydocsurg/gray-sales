import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
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

export default function MessagesScreen() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);
    const { authState, authDispatch } = useAuthContext();

    const handleDelete = (message: Message) => {
        // Delete the message from messages
        setMessages(messages.filter((m) => m.id !== message.id));
    };

    return (
        <Screen>
            <LoadingIndicator visible={authState.loading} />
            <FlatList
                data={messages}
                keyExtractor={(msg) => msg.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        listAction={() => {
                            return;
                        }}
                        renderActions={() => (
                            <ListItemDeleteAction
                                deleteAction={() => handleDelete(item)}
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
