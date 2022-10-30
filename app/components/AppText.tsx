import React from "react";
import { Text } from "react-native";

import defaultStyles from "../utils/styles";

export default function AppText({
    children,
    style,
}: {
    children: any;
    style: any;
}) {
    return <Text style={[defaultStyles.text, style]}>{children}</Text>;
}
