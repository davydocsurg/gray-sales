import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    AccountScreen,
    MessagesScreen,
    UpdateProfileScreen,
    UserProfileScreen,
} from "../screens";

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Group screenOptions={{ headerShown: false }}> */}
            <Stack.Screen name="Account Settings" component={AccountScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="Profile" component={UserProfileScreen} />
            <Stack.Screen
                name="Update Profile"
                component={UpdateProfileScreen}
            />
            {/* </Stack.Group> */}
        </Stack.Navigator>
    );
};

export default AccountNavigator;
