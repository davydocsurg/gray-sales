import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/form/AppForm";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";
import colors from "../utils/colors";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/images/logo-orange.png")}
            />
            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={(values: any) => console.log(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />

                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />

                <SubmitButton color={colors.orange} title="Login" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
});
