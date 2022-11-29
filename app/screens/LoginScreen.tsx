import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import { LoadingIndicator } from "../components";

import { AppForm, AppFormField, SubmitButton } from "../components/form";
import Screen from "../components/Screen";
import { login } from "../contexts/actions";
import { useAuthContext } from "../contexts/AuthContext";
import routes from "../navigation/routes";
import colors from "../utils/colors";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
});

export default function LoginScreen({ navigation }: any) {
    const { authState, authDispatch } = useAuthContext();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(authState.isLoggedIn, "from login screen");
    }, [authState.isLoggedIn]);

    const handleSubmit = async (values: Object, { resetForm }: any) => {
        setProgress(1);
        await login(authDispatch, values, (progress: number) =>
            setProgress(progress)
        );

        if (authState.errors?.length > 0) {
            return Alert.alert(`${authState?.errors}`);
        }

        if (authState.isLoggedIn) {
            setUploadVisible(true);
            navigation.navigate(routes.FEED);
        }
        // return resetForm();
    };

    return (
        <Screen style={styles.container}>
            <LoadingIndicator visible={authState.loading} />

            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />

            <Image
                style={styles.logo}
                source={require("../assets/images/logo-orange.png")}
            />
            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={(values: Object, formikBag: Object) =>
                    handleSubmit(values, formikBag)
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
