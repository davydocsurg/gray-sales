import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import * as Yup from "yup";

// locals
import { Screen } from "../components";
import {
    AppForm as Form,
    AppFormField as FormField,
    AppFormPicker as Picker,
    FormImagePicker,
    ProfileImagePicker,
    SubmitButton,
} from "../components/form";
import { updateProfileInfo } from "../contexts/actions";
import { useAuthContext } from "../contexts/AuthContext";
import routes from "../navigation/routes";
import colors from "../utils/colors";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    email: Yup.string().required().min(3).max(30).label("Email"),
    profilePhoto: Yup.array().min(1, "Please select at least one image."),
});

const UpdateProfileScreen = ({ navigation }: any) => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const { authState, authDispatch } = useAuthContext();

    const handleSubmit = async (values: Object, { resetForm }: any) => {
        // setProgress(0);
        setUploadVisible(true);

        await updateProfileInfo(authDispatch, values);
        // (progress: number)
        //  =>
        // setProgress(progress)

        if (authState.profileUpdateSuccess !== "updated") {
            setUploadVisible(false);
            setTimeout(() => {
                return Alert.alert(
                    "Something Went Wrong",
                    "Couldn't update profile",
                    [
                        {
                            text: "Close",
                            style: "cancel",
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => {},
                    }
                );
            }, 1500);
        }

        resetForm({
            values: "",
        });
        setUploadVisible(false);

        navigation.navigate(routes.USER_PROFILE);
    };

    return (
        <ScrollView style={styles.container}>
            <Screen
                style={[
                    // styles.container,
                    { marginBottom: Platform.OS === "android" ? 120 : 0 },
                ]}
            >
                <Form
                    initialValues={{
                        name: "",
                        email: "",
                        profilePhoto: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values: Object, formikBag: Object) =>
                        handleSubmit(values, formikBag)
                    }
                >
                    {/* <View style={{ alignItems: "center" }}> */}
                    <ProfileImagePicker
                        size={140}
                        imageRadius={70}
                        fieldName="profilePhoto"
                    />
                    {/* </View> */}

                    <FormField maxLength={255} name="name" placeholder="Name" />

                    <FormField
                        maxLength={255}
                        name="email"
                        placeholder="Email"
                    />

                    <SubmitButton color={colors.orange} title={"Update"} />
                </Form>
            </Screen>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        // alignItems: "center",
    },
});

export default UpdateProfileScreen;
