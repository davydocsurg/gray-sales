import React from "react";
import { FormikValues, useFormikContext } from "formik";

import AppButton from "../../commons/AppButton";
import colors from "../../utils/colors";

interface SubmitButtonProps {
    // handleSubmit: Function;
    color: string;
    title: string;
}

const SubmitButton = ({ color, title }: SubmitButtonProps) => {
    const { handleSubmit } = useFormikContext<FormikValues>();
    return (
        <AppButton color={color} onPress={() => handleSubmit()} title={title} />
    );
};

export default SubmitButton;
