import { Dispatch } from "react";
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import { IS_AUTHENTICATED, SET_AUTH_ERRORS } from "../types";

export const registerUser = async (dispatch: Dispatch<any>, fields: any) => {
    try {
        const response = await api.post(endPoints.register, {
            name: fields.name,
            email: fields.email,
            password: fields.password,
        });

        if (response.data?.data.success) {
            dispatch({
                type: IS_AUTHENTICATED,
                payload: true,
            });
        }
    } catch (error: Object | any) {
        console.error(error);
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: error?.content,
        });
    }
};
