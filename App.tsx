import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import useColorScheme from "./app/hooks/useColorScheme";
import { navigationTheme } from "./app/navigation";
import useCachedResources from "./app/hooks/useCachedResources";
import { AuthNavigator } from "./app/navigation";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NavigationContainer theme={navigationTheme}>
                <AuthNavigator />
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8eaed",
    },
});
