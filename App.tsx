import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import useColorScheme from "./app/hooks/useColorScheme";
import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import useCachedResources from "./app/hooks/useCachedResources";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NavigationContainer theme={navigationTheme}>
                <AppNavigator />
            </NavigationContainer>
        );
    }
}
