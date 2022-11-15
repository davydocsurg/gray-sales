import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import useCachedResources from "./app/hooks/useCachedResources";
import AppNavigator from "./app/navigation/AppNavigator";
import { StockProvider } from "./app/contexts/StockContext";
import { CategoryProvider } from "./app/contexts/CategoryContext";
import { OfflineNotice } from "./app/components";
import { AuthProvider } from "./app/contexts/AuthContext";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <>
                <OfflineNotice />
                <AuthProvider>
                    <CategoryProvider>
                        <StockProvider>
                            <NavigationContainer theme={navigationTheme}>
                                {/* <SafeAreaProvider> */}
                                {/* <AppNavigator /> */}
                                <AuthNavigator />
                                {/* </SafeAreaProvider> */}
                            </NavigationContainer>
                        </StockProvider>
                    </CategoryProvider>
                </AuthProvider>
            </>
        );
    }
}
