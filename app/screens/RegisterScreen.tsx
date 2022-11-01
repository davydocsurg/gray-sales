import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import { AppFormField, SubmitButton } from "../components/form/Index";
import { Screen } from "../components";
import AppForm from "../components/form/AppForm";
import colors from "../utils/colors";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().min(3).label("First Name"),
    lastName: Yup.string().required().min(3).label("Last Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string().required().min(8).label("Confrim Password"),
});

export default function RegisterScreen() {
    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/images/logo-orange.png")}
            />

            <AppForm
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(values: any) => console.log(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon=""
                    keyboardType="default"
                    name="firstName"
                    placeholder="First name"
                />

                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon=""
                    keyboardType="default"
                    name="lastName"
                    placeholder="Last name"
                />

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

                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    secureTextEntry
                    textContentType="password"
                />

                <SubmitButton color={colors.orange} title="register" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
});
