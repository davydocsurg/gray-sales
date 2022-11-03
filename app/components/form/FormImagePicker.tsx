import { FormikValues, useFormikContext } from "formik";
import React from "react";

import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

interface FieldName {
    fieldName: string;
}

const FormImagePicker = ({ fieldName = "" }: FieldName) => {
    const { errors, setFieldValue, handleChange, values, handleBlur } =
        useFormikContext<FormikValues>();

    const imageUris = values.images;

    const handleAdd = (uri: any) => {
        setFieldValue(fieldName!, [...imageUris, uri]);
    };

    const handleRemove = (uri: any) => {
        setFieldValue(
            fieldName,
            imageUris.filter((imageUri: any) => imageUri !== uri)
        );
    };

    return (
        <>
            <ImageInputList
                imageUris={imageUris}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
            />
            <ErrorMessage
                error={errors.images}
                visible={handleBlur("images")}
            />
        </>
    );
};

export default FormImagePicker;
