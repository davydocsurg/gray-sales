import { FormikProps, FormikValues, useFormikContext } from "formik";
import React from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface FormValues {
    name: string;
    rest: any;
}

interface OtherProps {
    message: string;
}

export default function AppFormField({ name, ...rest }: any) {
    // const { errors, touched } = props;
    // const { setFieldTouched, handleChange } = useFormikContext();
    const { setFieldTouched, handleChange, errors, touched } =
        useFormikContext();

    // const hasError = errors[name] && touched[name];
    return (
        <>
            <AppTextInput
                onBlur={() => {
                    setFieldTouched(name);
                }}
                onChangeText={handleChange(name)}
                {...rest}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}
