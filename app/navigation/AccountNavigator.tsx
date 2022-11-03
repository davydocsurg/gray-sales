import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen, MessagesScreen } from "../screens";

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Group screenOptions={{ headerShown: false }}> */}
            <Stack.Screen name="Account Settings" component={AccountScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
            {/* </Stack.Group> */}
        </Stack.Navigator>
    );
};

export default AccountNavigator;
