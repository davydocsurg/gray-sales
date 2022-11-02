import {
    FormikErrors,
    FormikProps,
    FormikValues,
    useFormikContext,
} from "formik";
import React, { useEffect } from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

type Obj = {
    price?: string;
    title?: string;
    description?: string;
};

interface Props extends TextInputProps {
    name: string;
    icon?: any;
    // errors: string;
    // errors: FormikErrors<Obj>;
    // touched?: any;
    width?: string;
}

export default function AppFormField({
    name,
    width,

    ...rest
}: Props) {
    const { errors, setFieldValue, touched, values } =
        useFormikContext<FormikValues>();
    return (
        <>
            <AppTextInput width={width} {...rest} />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}
