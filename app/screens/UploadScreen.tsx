import AnimatedLottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View, StyleSheet, Modal, Platform } from "react-native";
import * as Progress from "react-native-progress";

import colors from "../utils/colors";

interface UploadProps {
    onDone: any;
    progress: number;
    visible: boolean;
}

const UploadScreen = ({
    onDone,
    progress = 0,
    visible = false,
}: UploadProps) => {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ? (
                    <Progress.Bar
                        color={colors.primary}
                        progress={progress}
                        width={200}
                    />
                ) : (
                    <AnimatedLottieView
                        autoPlay
                        loop={false}
                        onAnimationFinish={onDone}
                        source={require("../assets/animations/loader.json")}
                        style={styles.animation}
                    />
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 150,
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
});

export default UploadScreen;
