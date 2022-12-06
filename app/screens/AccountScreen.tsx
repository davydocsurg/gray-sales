import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { BASE_URL } from "../api/constants";

// locals
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import { logout } from "../contexts/actions/auth";
import { useAuthContext } from "../contexts/AuthContext";
import { AuthUserDetails } from "../types";
import colors from "../utils/colors";

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        targetScreen: "Messages",
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary,
        },
        targetScreen: "Messages",
    },
];

export default function AccountScreen({ navigation }: any) {
    const { authDispatch } = useAuthContext();
    const isFocused = useIsFocused();
    const [authUserDetails, setAuthUserDetails] = useState<AuthUserDetails>();

    useEffect(() => {
        getAuthUser();
    }, [isFocused === true]);

    const handleLogout = () => {
        logout(authDispatch);
    };

    const getAuthUser = async () => {
        const authUser = await AsyncStorage.getItem("authUser");
        // if (authUser) {
        setAuthUserDetails(JSON.parse(authUser!));
        // }
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={authUserDetails?.name!}
                    subTitle={authUserDetails?.email!}
                    image={{ uri: BASE_URL + authUserDetails?.photo }}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                            listAction={() =>
                                navigation.navigate(item.targetScreen)
                            }
                        />
                    )}
                />
            </View>

            <ListItem
                title="Log Out"
                IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
                listAction={handleLogout}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
    },
});
