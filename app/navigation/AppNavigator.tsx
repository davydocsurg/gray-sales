import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { NewListingButton, routes } from ".";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootTabParamList } from "../../types";
import { ListingsEditScreen } from "../screens";
import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="ListingsEdit"
                component={ListingsEditScreen}
                options={({ navigation }) => ({
                    tabBarButton: () => (
                        <NewListingButton
                            onPress={() =>
                                navigation.navigate(routes.LISTING_EDIT)
                            }
                        />
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />

            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
