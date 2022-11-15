import { Dispatch } from "react";
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import { IS_AUTHENTICATED, LOADING_AUTH, SET_AUTH_ERRORS } from "../types";

export const registerUser = async (dispatch: Dispatch<any>, fields: any) => {
    try {
        dispatch({
            type: LOADING_AUTH,
            payload: true,
        });
        const response = await api.post(endPoints.register, {
            name: fields.name,
            email: fields.email,
            password: fields.password,
        });
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
        if (response.data?.data.success) {
            // dispatch({
            //     type: IS_AUTHENTICATED,
            //     payload: true,
            // });
            console.log("====================================");
            console.log("registered");
            console.log("====================================");
        }
    } catch (error: Object | any) {
        // console.error(error);
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: error?.content,
        });
    }
};

export const login = async (
    dispatch: Dispatch<any>,
    fields: any,
    onUploadProgress: Function
) => {
    try {
        dispatch({
            type: LOADING_AUTH,
            payload: true,
        });
        const response = await api.post(
            endPoints.login,
            {
                email: fields.email,
                password: fields.password,
            },
            {
                onUploadProgress: (progress) =>
                    onUploadProgress(progress.loaded / progress.total!),
            }
        );

        if (!response.data?.success) {
            return dispatch({
                type: SET_AUTH_ERRORS,
                payload: response.data?.message,
            });
        }

        dispatch({
            type: IS_AUTHENTICATED,
            payload: true,
        });
    } catch (error: Object | any) {
        console.error(error);
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: error?.content,
        });
    }
};
