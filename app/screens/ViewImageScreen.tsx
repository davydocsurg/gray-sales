import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";

// locals
import colors from "../utils/colors";

export default function ViewImageScreens() {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}></View>
            <View style={styles.deleteIcon}></View>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../assets/images/chair.jpg")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    closeIcon: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        position: "absolute",
        top: 40,
        left: 30,
    },

    deleteIcon: {
        backgroundColor: colors.secondary,
        height: 50,
        width: 50,
        position: "absolute",
        top: 40,
        right: 30,
    },

    container: {
        backgroundColor: colors.dark,
        flex: 1,
    },

    image: {
        width: "100%",
        height: "100%",
    },
});
