import React from "react";
import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import { BASE_URL } from "../api/constants";
import { useAuthContext } from "../contexts/AuthContext";
import colors from "../utils/colors";

const UserProfileScreen = () => {
    const { authState, authDispatch } = useAuthContext();

    // useEffect(() => {

    // }, [input])

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.bgImage}>{/* <Text>hello</Text> */}</View>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            BASE_URL +
                            authState.user.photo.replace("public", ""),
                    }}
                />
                <View style={styles.profInfo}>
                    <Text style={styles.name}>{authState.user.name}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
        // flex: 1,
    },
    container: {
        alignItems: "center",
        // flexDirection: "row",
        // paddingTop: 50,
        // position: "relative",
        // backgroundColor: colors.orange,
        // zIndex: -1,
    },
    bgImage: {
        zIndex: 1,
        height: 135,
        width: "100%",
        backgroundColor: colors.orange,
    },
    profInfo: {
        marginTop: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: "700",
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

export default UserProfileScreen;
