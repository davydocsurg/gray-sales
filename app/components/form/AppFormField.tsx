import { FormikProps, FormikValues, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    name: string;
}

export default function AppFormField({ name, ...rest }: any) {
    const { setFieldTouched, handleChange, errors, touched } =
        useFormikContext<FormikValues>();

    // const hasError = errors[name] && touched[name];
    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                {...rest}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}
