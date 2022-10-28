import { Image, StyleSheet, TouchableHighlight, Button } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import barcode from "./assets/images/barcode.png";

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<"TabOne">) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <TouchableHighlight>
                <Image
                    source={barcode}
                    style={{ width: 150, height: 150 }}
                    fadeDuration={1500}
                />
            </TouchableHighlight>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />

            <Button
                title="Hello"
                onPress={() => {
                    alert("Hey");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
