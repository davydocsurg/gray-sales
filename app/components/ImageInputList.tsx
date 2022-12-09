import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

interface ImageInputListProps {
    imageUris: Object[];
    onRemoveImage: Function;
    onAddImage: any;
    imageRadius?: number;
}

function ImageInputList({
    imageUris = [],
    onRemoveImage,
    onAddImage,
    imageRadius,
}: ImageInputListProps) {
    const scrollView = useRef();

    return (
        <View>
            <ScrollView
                ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current?.scrollToEnd()}
            >
                <View style={styles.container}>
                    {imageUris?.map((item: any, index) => (
                        <View key={index} style={styles.image}>
                            <ImageInput
                                imageRadius={imageRadius!}
                                imageUri={item.uri}
                                onChangeImage={() => onRemoveImage(item.uri)}
                            />
                        </View>
                    ))}
                    <ImageInput
                        imageRadius={imageRadius!}
                        onChangeImage={(uri: any) => onAddImage(uri)}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        marginRight: 10,
    },
});

export default ImageInputList;
