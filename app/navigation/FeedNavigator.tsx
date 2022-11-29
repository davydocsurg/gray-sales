import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    ListingDetailsScreen,
    ListingsScreen,
    MessagesScreen,
} from "../screens";

const Stack = createStackNavigator();

const FeedNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={ListingsScreen} />
            <Stack.Group
                screenOptions={{ presentation: "modal", headerShown: false }}
            >
                <Stack.Screen
                    name="ListingDetails"
                    component={ListingDetailsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
            <Stack.Screen name="Account" component={MessagesScreen} />
        </Stack.Navigator>
    );
};

export default FeedNavigator;
