import { FormikValues, useFormikContext } from "formik";
import React from "react";

import { ErrorMessage } from "./form";
import ImageInputList from "./ImageInputList";

const FormImagePicker = (name: any) => {
    const { errors, setFieldValue, touched, values, handleBlur } =
        useFormikContext<FormikValues>();
    const imageUris = values[name];

    const handleAdd = (uri: any) => {
        setFieldValue(name, [...imageUris, uri]);
    };

    const handleRemove = (uri: any) => {
        setFieldValue(
            name,
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
