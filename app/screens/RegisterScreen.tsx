import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
} from "../components/form";
import { LoadingIndicator, Screen } from "../components";
import colors from "../utils/colors";
import { registerUser } from "../contexts/actions";
import { useAuthContext } from "../contexts/AuthContext";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    // lastName: Yup.string().required().min(3).label("Last Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
});

const RegisterScreen = ({ navigation }: any) => {
    const { authState, authDispatch } = useAuthContext();

    const handleSubmit = async (values: Object, { resetForm }: any) => {
        const registered = await registerUser(authDispatch, values);

        if (authState.errors?.length > 0) {
            return Alert.alert(`${authState?.errors}`);
        }

        if (registered) {
            navigation.navigate(routes.LOGIN);
        }
    };

    return (
        <Screen style={styles.container}>
            <LoadingIndicator visible={authState.loading} />

            <Image
                style={styles.logo}
                source={require("../assets/images/logo-orange.png")}
            />

            <Form
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values: Object, formikBag: Object) =>
                    handleSubmit(values, formikBag)
                }
            >
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="account"
                    keyboardType="default"
                    name="name"
                    placeholder="Name"
                />

                {/* <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon=""
                    keyboardType="default"
                    name="lastName"
                    placeholder="Last name"
                /> */}

                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />

                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />

                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    secureTextEntry
                    textContentType="password"
                />

                <SubmitButton color={colors.orange} title="register" />
            </Form>

            <Text style={styles.loginMsg}>
                <Text>Already have an account? </Text>
                <Text
                    onPress={() => navigation.navigate(routes.LOGIN)}
                    style={styles.loginLink}
                >
                    Login
                </Text>
            </Text>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    loginMsg: {
        marginTop: 12,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 18,
    },
    loginLink: {
        color: colors.orange,
        fontSize: 20,
    },
});

export default RegisterScreen;
