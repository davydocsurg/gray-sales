import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ListingDetailsScreen, ListingsScreen } from "../screens";

const Stack = createStackNavigator();

const FeedNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListingsScreen" component={ListingsScreen} />
            <Stack.Group
                screenOptions={{ presentation: "modal", headerShown: false }}
            >
                <Stack.Screen
                    name="ListingDetails"
                    component={ListingDetailsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default FeedNavigator;
