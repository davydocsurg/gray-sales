import React, { useRef } from "react";
import { View, StyleSheet, Button } from "react-native";
import LottieView from "lottie-react-native";

const LoadingIndicator = ({ visible = false }) => {
    const animation = useRef(null);

    if (!visible) return null;

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                // ref={animation}
                style={{
                    width: 200,
                    height: 200,
                }}
                loop
                source={require("../assets/animations/loader.json")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});

export default LoadingIndicator;
