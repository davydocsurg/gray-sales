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
    SubmitButton,
} from "../components/form";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    email: Yup.number().required().min(3).max(10000).label("Email"),
    photo: Yup.array().min(1, "Please select at least one image."),
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
                        photo: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={() => console.log("")}
                    // onSubmit={(values: Object, formikBag: Object) =>
                    //     handleSubmit(values, formikBag)
                    // }
                >
                    <FormImagePicker imageRadius={50} fieldName="photo" />

                    <FormField maxLength={255} name="name" placeholder="Name" />
                </Form>
            </Screen>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // alignItems: "center",
    },
});

export default UpdateProfileScreen;
