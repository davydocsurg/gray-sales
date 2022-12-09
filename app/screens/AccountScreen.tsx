import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Pressable,
    Image,
    Text,
    ScrollView,
} from "react-native";
import { UserProfileScreen } from ".";

// locals
import { BASE_URL } from "../api/constants";
import { AppButton } from "../commons";
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
        title: "My Stocks",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.orange,
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
        <View style={styles.screen}>
            <View style={styles.profileContainer}>
                <View style={styles.bgImage}>{/* <Text>hello</Text> */}</View>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            BASE_URL +
                            authState.user?.photo.replace("public", ""),
                    }}
                />
                <View style={styles.profInfo}>
                    <Text style={styles.name}>{authState.user?.name}</Text>
                    <Text style={styles.email}>{authState.user?.email}</Text>

                    <AppButton
                        color={colors.orange}
                        onPress={() => console.log("kd")}
                        title={"Edit Profile >"}
                    />
                </View>
            </View>
            {/* <UserProfileScreen /> */}
            {/* <View style={styles.container}>
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
            </View> */}

            {/* <Screen> */}
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
                IconComponent={
                    <Icon name="logout" backgroundColor={colors.danger} />
                }
                listAction={handleLogout}
            />
            {/* </Screen> */}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
        flex: 1,
    },
    profileContainer: {
        marginTop: 0,
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
        // marginBottom: 0,
    },
    bgImage: {
        zIndex: 1,
        height: 135,
        width: "100%",
        backgroundColor: colors.orange,
    },
    profInfo: {
        marginTop: 12,
        alignItems: "center",
    },
    name: {
        fontSize: 22,
        fontWeight: "700",
    },
    email: {
        fontSize: 18,
        fontWeight: "400",
    },
    image: {
        zIndex: 2,
        // position: "absolute",
        width: 120,
        height: 120,
        borderRadius: 65,
        marginTop: -70,
    },
});
