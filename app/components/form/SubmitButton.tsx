import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../../commons/AppButton";
import colors from "../../utils/colors";

interface SubmitButtonProps {
    color: string;
    title: string;
}

const SubmitButton = ({ color, title }: SubmitButtonProps) => {
    const { handleSubmit } = useFormikContext();

    return <AppButton color={color} onPress={handleSubmit} title={title} />;
};

export default SubmitButton;
