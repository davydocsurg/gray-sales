import { Dispatch } from "react";
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import {
    IS_AUTHENTICATED,
    LOADING_AUTH,
    SET_AUTH_ERRORS,
    SET_AUTH_USER,
} from "../types";

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
        console.log(response);
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
        const response = await api.post(endPoints.login, {
            email: fields.email,
            password: fields.password,
        });

        if (response?.data?.success === false) {
            return dispatch({
                type: SET_AUTH_ERRORS,
                payload: response.data?.message,
            });
        }

        dispatch({
            type: IS_AUTHENTICATED,
        });

        // onUploadProgress = (progress: any) =>
        //     onUploadProgress(progress.loaded / progress.total!);
    } catch (error: Object | any) {
        console.error(error);
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: error?.content,
        });
    }
};

export const getAuthUser = async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: LOADING_AUTH,
            payload: true,
        });
        const response = await api.get(endPoints.authUser);
        dispatch({
            type: SET_AUTH_USER,
            payload: response.data,
        });
    } catch (error: Object | any) {
        console.error(error);
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: error?.content,
        });
    }
};
