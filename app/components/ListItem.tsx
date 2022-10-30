import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AppText from "../commons/AppText";
import colors from "../utils/colors";

export default function ListItem({
    image,
    title,
    subTitle,
    listAction,
    renderActions,
    IconComponent,
}: {
    image?: any;
    title: string;
    subTitle?: string;
    listAction?: any;
    renderActions?: any;
    IconComponent?: any;
}) {
    return (
        <Swipeable renderRightActions={renderActions}>
            <TouchableHighlight
                underlayColor={colors.light}
                onPress={listAction}
            >
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        <AppText style={styles.subTitle}>{subTitle}</AppText>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: "500",
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
    },
});
