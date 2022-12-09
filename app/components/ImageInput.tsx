import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ImageInputProps {
    imageUri?: any;
    onChangeImage: Function;
    imageRadius: number;
}

const ImageInput = ({
    imageUri,
    onChangeImage,
    imageRadius,
}: ImageInputProps) => {
    useEffect(() => {
        requestPermission();
        console.log(imageRadius);
    }, []);

    const requestPermission = async () => {
        const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
        // if (!granted)
        //     alert("You need to enable permission to access the library.");
    };

    const handlePress = () => {
        if (!imageUri) selectImage();
        else
            Alert.alert(
                "Delete",
                "Are you sure you want to delete this image?",
                [
                    { text: "Yes", onPress: () => onChangeImage(null) },
                    { text: "No" },
                ]
            );
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                // aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                onChangeImage(result);
            }
        } catch (error) {
            console.log("Error reading an image", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.container, { borderRadius: imageRadius }]}>
                {!imageUri && (
                    <MaterialCommunityIcons
                        color={colors.medium}
                        name="camera"
                        size={40}
                    />
                )}
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.light,
        // borderRadius: ,
        height: 100,
        justifyContent: "center",
        marginVertical: 10,
        overflow: "hidden",
        width: 100,
    },
    image: {
        height: "100%",
        width: "100%",
    },
});

export default ImageInput;
