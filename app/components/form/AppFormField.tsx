import { FormikProps, FormikValues, useFormikContext } from "formik";
import React from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

const AppFormField = (props: any) => {
    const {
        placeholder,
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
        <>
            <TextInput
                placeholder={placeholder}
                onChangeText={(text) => onChange(name)(text)}
                onBlur={() => {
                    setFieldTouched(name);
                    onBlur(name);
                }}
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                {...inputProps}
            />
            {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
        </>
    );
};

export default AppFormField;

// export default function AppFormField({ name, ...rest }: any) {
//     // const {
//     //     onBlur,
//     //     handleChange,
//     //     value,
//     //     form: { errors, touched, setFieldTouched },
//     //     ...rest
//     // } = props;

//     const { setFieldTouched, handleChange, errors, touched }: any =
//         useFormikContext();

//     // const hasError = errors[name] && touched[name];
//     return (
//         <>
//             <AppTextInput
//                 onBlur={() => {
//                     setFieldTouched(name);
//                 }}
//                 onChangeText={handleChange(name)}
//                 {...rest}
//             />
//             <ErrorMessage error={errors[name]} visible={touched[name]} />
//         </>
//     );
// }
