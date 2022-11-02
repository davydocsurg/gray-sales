import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    AppFormPicker as Picker,
    ErrorMessage,
    SubmitButton,
} from "../components/form";
import { Screen, CategoryPicker, FormImagePicker } from "../components";
import colors from "../utils/colors";
import {
    Formik,
    FormikValues,
    useFormikContext,
    yupToFormErrors,
} from "formik";
import AppText from "../commons/AppText";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().required().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
    {
        backgroundColor: "#fc5c65",
        icon: "floor-lamp",
        label: "Furniture",
        value: 1,
    },
    {
        backgroundColor: "#fd9644",
        icon: "car",
        label: "Cars",
        value: 2,
    },
    {
        backgroundColor: "#fed330",
        icon: "camera",
        label: "Cameras",
        value: 3,
    },
    {
        backgroundColor: "#26de81",
        icon: "cards",
        label: "Games",
        value: 4,
    },
    {
        backgroundColor: "#2bcbba",
        icon: "shoe-heel",
        label: "Clothing",
        value: 5,
    },
    {
        backgroundColor: "#45aaf2",
        icon: "basketball",
        label: "Sports",
        value: 6,
    },
    {
        backgroundColor: "#4b7bec",
        icon: "headphones",
        label: "Movies & Music",
        value: 7,
    },
    {
        backgroundColor: "#a55eea",
        icon: "book-open-variant",
        label: "Books",
        value: 8,
    },
    {
        backgroundColor: "#778ca3",
        icon: "application",
        label: "Other",
        value: 9,
    },
];

const ListingsEditScreen = () => {
    const submitForm = async (values: any) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{
                title: "",
                price: "",
                description: "",
                category: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => submitForm(values)}
        >
            {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
                <Screen style={styles.container}>
                    <FormImagePicker name="images" />
                    <FormField
                        onChangeText={handleChange("title")}
                        maxLength={255}
                        onBlur={handleBlur("title")}
                        name="title"
                        placeholder="Title"
                        value={values.title}
                        errors={errors}
                    />
                    {errors && (
                        <ErrorMessage
                            error={errors.title}
                            visible={handleBlur("title")}
                        />
                    )}

                    <FormField
                        onChangeText={handleChange("price")}
                        keyboardType="numeric"
                        maxLength={8}
                        name="price"
                        placeholder="Price"
                        value={values.price}
                        errors={errors}
                    />

                    {errors && (
                        <ErrorMessage
                            error={errors.price}
                            visible={handleBlur("price")}
                        />
                    )}

                    <Picker
                        PickerItemComponent={CategoryPicker}
                        numberOfColumns={3}
                        items={categories}
                        name="category"
                        placeholder="Category"
                    />

                    {errors && (
                        <ErrorMessage
                            error={errors.category}
                            visible={handleBlur("category")}
                        />
                    )}

                    <FormField
                        onChangeText={handleChange("description")}
                        maxLength={255}
                        multiline
                        name="description"
                        numberOfLines={3}
                        placeholder="Description"
                        value={values.description}
                        errors={errors}
                    />

                    {errors && (
                        <ErrorMessage
                            error={errors.description}
                            visible={handleBlur("description")}
                        />
                    )}
                    <SubmitButton
                        title="Submit"
                        color={colors.orange}
                        handleSubmit={() => handleSubmit()}
                    />
                </Screen>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default ListingsEditScreen;
