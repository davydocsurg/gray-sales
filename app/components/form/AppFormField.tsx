import { FormikProps, FormikValues, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface Props extends TextInputProps {
    name?: any;
    icon?: any;
    width?: string;
}

export default function AppFormField({ name, width, ...rest }: Props | any) {
    const {
        setFieldTouched,
        handleChange,
        errors,
        touched,
        isSubmitting,
        isValidating,
    } = useFormikContext<FormikValues>();

    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                width={width}
                {...rest}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}
