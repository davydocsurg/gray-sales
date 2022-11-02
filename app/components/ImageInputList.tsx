import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

interface ImageInputListProps {
    imageUris: [];
    onRemoveImage: Function;
    onAddImage: any;
}

const ImageInputList = ({
    imageUris = [],
    onRemoveImage,
    onAddImage,
}: ImageInputListProps) => {
    const scrollView = useRef();

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current?.scrollToEnd()}
            >
                <View style={styles.container}>
                    {imageUris.map((uri: string) => (
                        <View key={uri} style={styles.image}>
                            <ImageInput
                                imageUri={uri}
                                onChangeImage={() => onRemoveImage(uri)}
                            />
                        </View>
                    ))}
                    <ImageInput
                        onChangeImage={(uri: string) => onAddImage(uri)}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        marginRight: 10,
    },
});

export default ImageInputList;
