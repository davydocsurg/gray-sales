import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";

// locals
import { BASE_URL } from "../api/constants";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import { getAuthUser, logout, storeAuthUser } from "../contexts/actions";
import { useAuthContext } from "../contexts/AuthContext";
import routes from "../navigation/routes";
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
    const { authState, authDispatch } = useAuthContext();
    const isFocused = useIsFocused();
    const [authUserDetails, setAuthUserDetails] = useState<AuthUserDetails>();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        handleStoreAuthUser();
    }, [isFocused === true]);

    const handleLogout = () => {
        logout(authDispatch);
    };

    const handleStoreAuthUser = async () => {
        // const authUser = await AsyncStorage.getItem("authUser");
        // setAuthUserDetails(JSON.parse(authUser!));
        storeAuthUser(authDispatch);
    };

    const refreshAuthUser = async () => {
        await getAuthUser(authDispatch);
        handleStoreAuthUser();
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                {/* <FlatList
                    refreshing={refreshing}
                    onRefresh={() => console.log("ndfkn")}
                /> */}
                {/* <Pressable
                    onPress={() => navigation.navigate(routes.USER_PROFILE)}
                > */}
                <ListItem
                    title={authState.user?.name!}
                    subTitle={authState.user?.email!}
                    image={{
                        uri:
                            BASE_URL +
                            authState.user?.photo.replace("public", ""),
                    }}
                    listAction={() => navigation.navigate(routes.USER_PROFILE)}
                />
                {/* </Pressable> */}
            </View>

            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshing={refreshing}
                    onRefresh={refreshAuthUser}
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
