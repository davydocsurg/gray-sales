import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    AppFormPicker as Picker,
    SubmitButton,
} from "../components/form";
import { Screen, CategoryPicker } from "../components";
import colors from "../utils/colors";
import { FormImagePicker } from "../components/form";
import { useLocation } from "../hooks";
import useApi from "../hooks/useApi";
import listings from "../api/listings";
import categoryApi from "../api/categoryApi";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(3).label("Title"),
    price: Yup.number().required().min(3).max(10000).label("Price"),
    description: Yup.string().min(5).required().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image."),
});

// const categories = [
//     {
//         backgroundColor: "#fc5c65",
//         icon: "floor-lamp",
//         label: "Furniture",
//         value: 1,
//     },
//     {
//         backgroundColor: "#fd9644",
//         icon: "car",
//         label: "Cars",
//         value: 2,
//     },
//     {
//         backgroundColor: "#fed330",
//         icon: "camera",
//         label: "Cameras",
//         value: 3,
//     },
//     {
//         backgroundColor: "#26de81",
//         icon: "cards",
//         label: "Games",
//         value: 4,
//     },
//     {
//         backgroundColor: "#2bcbba",
//         icon: "shoe-heel",
//         label: "Clothing",
//         value: 5,
//     },
//     {
//         backgroundColor: "#45aaf2",
//         icon: "basketball",
//         label: "Sports",
//         value: 6,
//     },
//     {
//         backgroundColor: "#4b7bec",
//         icon: "headphones",
//         label: "Movies & Music",
//         value: 7,
//     },
//     {
//         backgroundColor: "#a55eea",
//         icon: "book-open-variant",
//         label: "Books",
//         value: 8,
//     },
//     {
//         backgroundColor: "#778ca3",
//         icon: "application",
//         label: "Other",
//         value: 9,
//     },
// ];

const ListingsEditScreen = () => {
    const location = useLocation();
    const getCategoriesApi = useApi(categoryApi.getCategories);
    const [categories, setCategories] = useState<any>();

    useEffect(() => {
        setUpCategories();
    }, []);

    const setUpCategories = async () => {
        await getCategoriesApi.request();
        setCategories(getCategoriesApi.data?.data.categories);
    };

    const handleSubmit = async (listing: any) => {
        const result = await listings.addListing(listing);
        // console.log(result.data.errors);

        if (!result.ok) {
            return alert("Could not save listing");
        }

        alert("Success");
    };

    return (
        <Form
            initialValues={{
                title: "",
                price: "",
                description: "",
                category: null,
                images: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values: any) => handleSubmit(values)}
        >
            {/* {({ handleBlur, values, errors }) => ( */}
            <Screen style={styles.container}>
                <FormImagePicker fieldName="images" />

                <FormField maxLength={255} name="title" placeholder="Title" />

                <FormField
                    keyboardType="numeric"
                    maxLength={8}
                    name="price"
                    placeholder="Price"
                />

                <Picker
                    PickerItemComponent={CategoryPicker}
                    numberOfColumns={3}
                    items={categories}
                    name="category"
                    placeholder="Category"
                    onPress={setUpCategories}
                />

                <FormField
                    maxLength={255}
                    multiline
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                />

                <SubmitButton title="Submit" color={colors.orange} />
            </Screen>
            {/* )} */}
        </Form>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default ListingsEditScreen;
