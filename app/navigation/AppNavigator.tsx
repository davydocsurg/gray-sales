import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { NewListingButton, routes } from ".";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootTabParamList } from "../../types";

import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import AccountNavigator from "./AccountNavigator";
import { ListingsEditScreen, ListingsScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../utils/colors";
import { useAuthContext } from "../contexts/AuthContext";
import AuthNavigator from "./AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAuthUser } from "../contexts/actions";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator();

const AppNavigator = () => {
    const { authState, authDispatch } = useAuthContext();

    useEffect(() => {
        checkAuthUser(authDispatch);
    }, [authState.isLoggedIn]);

    if (!authState.isLoggedIn) {
        return <AuthNavigator />;
    } else
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // tabBarInactiveTintColor: colors.brown,
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === "Feed") {
                            return (
                                <MaterialCommunityIcons
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            );
                        }

                        if (route.name === "ListingsEdit") {
                            return (
                                <MaterialCommunityIcons
                                    name="plus-circle"
                                    color={color}
                                    size={size}
                                />
                            );
                        }

                        if (route.name === "Account") {
                            return (
                                <MaterialCommunityIcons
                                    name="account"
                                    color={color}
                                    size={size}
                                />
                            );
                        }
                    },
                })}
            >
                {/* <Stack.Screen name="Listings" component={ListingsScreen} /> */}
                <Tab.Screen
                    name="Feed"
                    component={FeedNavigator}
                    options={{
                        headerShown: false,
                        headerTitle: "Feed",
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
                    })}
                />

                <Tab.Screen
                    name="Account"
                    component={AccountNavigator}
                    options={{
                        headerShown: false,
                        headerTitle: "Account",
                    }}
                />
            </Tab.Navigator>
        );
};

export default AppNavigator;
