import React from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
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
import colors from "../utils/colors";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    email: Yup.number().required().min(3).max(10000).label("Email"),
    profilePhoto: Yup.array().min(1, "Please select at least one image."),
});

const UpdateProfileScreen = () => {
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
                    onSubmit={() => console.log("")}
                    // onSubmit={(values: Object, formikBag: Object) =>
                    //     handleSubmit(values, formikBag)
                    // }
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
