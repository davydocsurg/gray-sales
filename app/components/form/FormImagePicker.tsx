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
        console.log("====================================");
        console.log(uri);
        let localUri = uri.uri;
        let filename = localUri.split("/").pop();
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const photo = { uri: localUri, name: filename, type };
        let arr = [...imageUris];
        arr.push(photo);
        setFieldValue(fieldName!, arr);
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
