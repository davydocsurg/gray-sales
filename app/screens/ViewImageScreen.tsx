import { Image, View } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// locals
import colors from "../utils/colors";

export default function ViewImageScreens() {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" color="white" size={35} />
            </View>
            <View style={styles.deleteIcon}>
                <MaterialCommunityIcons name="delete" color="white" size={35} />
            </View>
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
        position: "absolute",
        top: 40,
        left: 30,
    },

    deleteIcon: {
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
