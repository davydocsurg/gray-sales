import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";
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
import { useCategoryContext } from "../contexts/CategoryContext";
import { createStock, fetchCategories } from "../contexts/actions";
import UploadScreen from "./UploadScreen";
import { useStockContext } from "../contexts/StockContext";

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
    const { categoryState, categoryDispatch } = useCategoryContext();

    const { stockState, stockDispatch } = useStockContext();

    const [image, setImage] = useState(null);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setUpCategories();
    }, []);

    const setUpCategories = () => {
        fetchCategories(categoryDispatch);
    };

    const handleSubmit = async (values: Object, { resetForm }: any) => {
        // setProgress(0);
        // setUploadVisible(true);
        await createStock(stockDispatch, values, image);
        // (progress: number)
        //  =>
        // setProgress(progress)

        if (!stockState?.success) {
            setUploadVisible(false);
            setTimeout(() => {
                return Alert.alert(
                    "Something Went Wrong",
                    "Couldn't save stocks",
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
            }, 1000);
        }

        // resetForm({
        //     values: "",
        // });
    };

    return (
        <Screen
            style={[
                styles.container,
                { marginBottom: Platform.OS === "android" ? 120 : 0 },
            ]}
        >
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />

            <Form
                initialValues={{
                    title: "",
                    price: "",
                    description: "",
                    category: null,
                    images: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values: Object, formikBag: Object) =>
                    handleSubmit(values, formikBag)
                }
            >
                {/* {({ handleBlur, values, errors }) => ( */}
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
                    items={categoryState?.categories}
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
                {/* )} */}
            </Form>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default ListingsEditScreen;
