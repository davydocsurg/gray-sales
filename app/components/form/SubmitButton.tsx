import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../../commons/AppButton";
import colors from "../../utils/colors";

interface SubmitButtonProps {
    handleSubmit: Function;
    color: string;
    title: string;
}

const SubmitButton = ({ color, title, handleSubmit }: SubmitButtonProps) => {
    return <AppButton color={color} onPress={handleSubmit} title={title} />;
};

export default SubmitButton;
