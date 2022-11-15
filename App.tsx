import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import useCachedResources from "./app/hooks/useCachedResources";
import AppNavigator from "./app/navigation/AppNavigator";
import { StockProvider } from "./app/contexts/StockContext";
import { CategoryProvider } from "./app/contexts/CategoryContext";
import { OfflineNotice } from "./app/components";
import { AuthProvider, useAuthContext } from "./app/contexts/AuthContext";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { useEffect } from "react";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const { authState, authDispatch } = useAuthContext();

    // useEffect(() => {

    // }, [authState.isLoggedIn]);

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
                                {authState.isLoggedIn === false ? (
                                    <AuthNavigator />
                                ) : (
                                    <AppNavigator />
                                )}
                            </NavigationContainer>
                        </StockProvider>
                    </CategoryProvider>
                </AuthProvider>
            </>
        );
    }
}
