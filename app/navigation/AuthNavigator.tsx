import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { WelcomeScreen, LoginScreen, RegisterScreen, ListingsScreen } from "../screens";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Feed" component={ListingsScreen} />

        </Stack.Navigator>
    );
};

export default AuthNavigator;
