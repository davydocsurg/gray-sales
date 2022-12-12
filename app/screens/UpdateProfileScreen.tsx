import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import * as Yup from "yup";

// locals
import { LoadingIndicator, Screen } from "../components";
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
import { ProfileUpdateFields } from "../types";
import colors from "../utils/colors";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    email: Yup.string().required().min(3).max(30).label("Email"),
    profilePhoto: Yup.array().min(1, "Please select at least one image."),
});

const UpdateProfileScreen = ({ navigation }: any) => {
    const [progress, setProgress] = useState(0);
    const { authUser, handleProfileUpdate } = useAuthContext();

    const handleSubmit = async (
        values: ProfileUpdateFields,
        { resetForm }: any
    ) => {
        const stats = await handleProfileUpdate(values);

        // if (authUser.profileUpdateSuccess !== "updated") {
        if (stats !== true) {
            console.log(stats);
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
        }

        Alert.alert("Profile Updated Successfully!");
        return navigation.navigate(routes.ACCOUNT);

        // setProgress(0);
        // await updateProfileInfo(authDispatch, values);
        // // (progress: number)
        // //  =>
        // // setProgress(progress)
        // if (authState.profileUpdateSuccess !== "updated") {
        //     setTimeout(() => {
        // return Alert.alert(
        //     "Something Went Wrong",
        //     "Couldn't update profile",
        //     [
        //         {
        //             text: "Close",
        //             style: "cancel",
        //         },
        //     ],
        //     {
        //         cancelable: true,
        //         onDismiss: () => {},
        //     }
        // );
        //     }, 3500);
        // }
        // resetForm({
        //     values: "",
        // });
        // navigation.navigate(routes.USER_PROFILE);
    };

    return (
        <ScrollView style={styles.container}>
            <LoadingIndicator visible={authUser.loading} />

            <Screen
                style={[
                    // styles.container,
                    {
                        marginBottom: Platform.OS === "android" ? 120 : 0,
                        // alignItems: "center",
                    },
                ]}
            >
                <Form
                    initialValues={{
                        name: "",
                        email: "",
                        profilePhoto: [],
                    }}
                    // enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values: ProfileUpdateFields,
                        formikBag: Object
                    ) => handleSubmit(values, formikBag)}
                >
                    {/* <View style={{ alignItems: "center" }}> */}
                    <ProfileImagePicker
                        size={140}
                        imageRadius={70}
                        fieldName="profilePhoto"
                    />
                    {/* </View> */}

                    <FormField
                        maxLength={255}
                        name="name"
                        placeholder="Name"
                        // value={authUser.user.name}
                    />

                    <FormField
                        maxLength={255}
                        name="email"
                        placeholder="Email"
                        // value={authUser.user.email}
                    />

                    <View style={{ alignItems: "center" }}>
                        <SubmitButton
                            width="50%"
                            color={colors.orange}
                            title={"Update"}
                        />
                    </View>
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
