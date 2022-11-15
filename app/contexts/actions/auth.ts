import { Dispatch } from "react";
import api from "../../api";
import { endPoints } from "../../api/endPoints";

export const registerUser = async (dispatch: Dispatch<any>, fields: Object) => {
    try {
        const response = await api.post(endPoints.register, {
            name: fields.name,
            email: fields.email,
            password: fields.password,
        });

        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
    } catch (error) {
        console.error(error);
    }
};
