import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./app/hooks/useCachedResources";
import useColorScheme from "./app/hooks/useColorScheme";
// import Navigation from "./app/navigation";
import {
    useDeviceOrientation,
    useDimensions,
} from "@react-native-community/hooks";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import SalesList from "./app/components/SalesList";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import Screen from "./app/components/Screen";
import MessagesScreen from "./app/screens/MessagesScreen";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const { landscape } = useDeviceOrientation();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Screen style={styles.container}>
                    <MessagesScreen />
                    {/* <ListingDetailsScreen /> */}
                    {/* <ListingsScreen /> */}
                    {/* <SalesList /> */}
                    {/* <WelcomeScreen /> */}
                    {/* <ViewImageScreen /> */}
                </Screen>
                {/* <Navigation colorScheme={colorScheme} /> */}
                {/* <StatusBar /> */}
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8eaed",
    },
});
