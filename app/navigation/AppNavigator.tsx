import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthNavigator } from ".";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedNavigator from "./FeedNavigator";
import { RootTabParamList } from "../../types";

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default AppNavigator;
