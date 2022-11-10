import { NavigationContainer } from "@react-navigation/native";

import useColorScheme from "./app/hooks/useColorScheme";
import navigationTheme from "./app/navigation/navigationTheme";
import useCachedResources from "./app/hooks/useCachedResources";
import AppNavigator from "./app/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StockProvider } from "./app/contexts/StockContext";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <StockProvider>
                <NavigationContainer theme={navigationTheme}>
                    {/* <SafeAreaProvider> */}
                    <AppNavigator />
                    {/* </SafeAreaProvider> */}
                </NavigationContainer>
            </StockProvider>
        );
    }
}
