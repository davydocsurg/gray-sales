import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { ErrorMessage } from "./form";
import ImageInputList from "./ImageInputList";

const FormImagePicker = (name: any) => {
    const { errors, setFieldValue, touched, values } =
        useFormikContext<FormikValues>();
    const imageUris = values[name];

    const handleAdd = (uri: any) => {
        console.log("====================================");
        console.log(values);
        console.log("====================================");
        setFieldValue(name, [...imageUris, uri]);
    };

    const handleRemove = (uri: string) => {
        setFieldValue(
            name,
            imageUris.filter((imageUri: string) => imageUri !== uri)
        );
    };

    return (
        <>
            <ImageInputList
                imageUris={imageUris}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default FormImagePicker;
