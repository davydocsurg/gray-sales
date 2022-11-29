import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import useCachedResources from "./app/hooks/useCachedResources";
import AppNavigator from "./app/navigation/AppNavigator";
import { StockProvider } from "./app/contexts/StockContext";
import { CategoryProvider } from "./app/contexts/CategoryContext";
import { OfflineNotice } from "./app/components";
import { AuthProvider, useAuthContext } from "./app/contexts/AuthContext";
import AuthNavigator from "./app/navigation/AuthNavigator";

const App = () => {
    const isLoadingComplete = useCachedResources();
    const { authState, authDispatch } = useAuthContext();
    const [state, setstate] = useState(false);

    useEffect(() => {
        console.log("==================================== fctgfhghj");
        console.log(authState.isLoggedIn, "from app.tsx");
        console.log("====================================");
    }, [authState]);

    // if (!isLoadingComplete) {
    //     return null;
    // }
    // if (authState.isLoggedIn === false) {
    //     return (
    //         <>
    //             <OfflineNotice />
    //             <AuthProvider>
    //                 <NavigationContainer theme={navigationTheme}>
    //                     <AuthNavigator />
    //                 </NavigationContainer>
    //             </AuthProvider>
    //         </>
    //     );
    // } else
    return (
        <>
            <OfflineNotice />
            <AuthProvider>
                <CategoryProvider>
                    <StockProvider>
                        <NavigationContainer theme={navigationTheme}>
                            {/* {!authState.isLoggedIn ? (
                                <AuthNavigator />
                            ) : (
                                )} */}
                            <AppNavigator />
                        </NavigationContainer>
                    </StockProvider>
                </CategoryProvider>
            </AuthProvider>
        </>
    );
};

export default App;
