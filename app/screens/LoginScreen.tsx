import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/form";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import colors from "../utils/colors";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
});

export default function LoginScreen({ navigation }: any) {
    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/images/logo-orange.png")}
            />
            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={(values: Object, formikBag: Object) =>
                    console.log(values)
                }
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

            <Text style={styles.registerMsg}>
                <Text>Don't have an account? </Text>
                <Text
                    onPress={() => navigation.navigate(routes.REGISTER)}
                    style={styles.registerLink}
                >
                    Register
                </Text>
            </Text>
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
    registerMsg: {
        marginTop: 12,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 18,
    },
    registerLink: {
        color: colors.orange,
        fontSize: 20,
    },
});
