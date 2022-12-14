import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    AccountScreen,
    AuthUserStockDetails,
    MessagesScreen,
    MyStocksScreen,
    UpdateProfileScreen,
    UserProfileScreen,
} from "../screens";

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account Settings" component={AccountScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="Profile" component={UserProfileScreen} />
            <Stack.Screen
                name="Update Profile"
                component={UpdateProfileScreen}
            />
            <Stack.Screen name="My Stocks" component={MyStocksScreen} />
            <Stack.Group
                screenOptions={{ headerShown: false, presentation: "modal" }}
            >
                <Stack.Screen
                    name="Stock Details"
                    component={AuthUserStockDetails}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AccountNavigator;
