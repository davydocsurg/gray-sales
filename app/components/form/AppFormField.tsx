import { FormikProps, FormikValues, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface Props extends TextInputProps {
    name?: any;
    icon?: any;
}

export default function AppFormField({ name, ...rest }: Props | any) {
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
