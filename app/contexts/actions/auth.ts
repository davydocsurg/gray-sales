import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// locals
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import {
    IS_AUTHENTICATED,
    LOADING_AUTH,
    NOT_AUTHENTICATED,
    SET_AUTH_ERRORS,
    SET_AUTH_USER,
    STOP_LOADING_AUTH,
    UPDATE_PROFILE_SUCCESS,
} from "../types";

interface Fields {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export const registerUser = async (dispatch: Dispatch<any>, fields: Fields) => {
    try {
        dispatch({
            type: LOADING_AUTH,
            payload: true,
        });
        const response = await api.post(endPoints.register, {
            name: fields.name,
            email: fields.email,
            password: fields.password,
            passwordConfirmation: fields.passwordConfirmation,
        });

        if (response.data?.success) {
            dispatch({
                type: STOP_LOADING_AUTH,
                payload: false,
            });
            return true;
        }
        dispatch({
            type: STOP_LOADING_AUTH,
            payload: false,
        });
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

        await storeAuthUserToken(response.data?.token);
        await restoreAuthUser(response.data?.user);
        dispatch({
            type: IS_AUTHENTICATED,
            payload: true,
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

const storeAuthUserToken = async (token: string) => {
    try {
        await AsyncStorage.setItem("authToken", token);
    } catch (e) {
        console.error(e);
    }
};

const restoreAuthUser = async (authUser: Object) => {
    try {
        const data = JSON.stringify(authUser);

        await AsyncStorage.mergeItem("authUser", data);
    } catch (error: unknown) {
        console.error(error);
    }
};

export const getAuthUser = async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: LOADING_AUTH,
            payload: true,
        });
        const response = await api.get(endPoints.authUser);

        restoreAuthUser(response.data?.data?.user);
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

export const logout = async (dispatch: Dispatch<any>) => {
    try {
        await AsyncStorage.removeItem("authToken");
        dispatch({
            type: NOT_AUTHENTICATED,
            payload: false,
        });
    } catch (error: Object | any) {
        console.error(error);
    }
};

export const checkAuthUser = async (dispatch: Dispatch<any>) => {
    try {
        const authToken = await AsyncStorage.getItem("authToken");

        if (authToken !== null) {
            dispatch({
                type: IS_AUTHENTICATED,
                payload: true,
            });
        }
    } catch (error: unknown) {
        console.error(error);
    }
};

export const fetchAuthUser = async (dispatch: Dispatch<any>) => {
    let authUser = await AsyncStorage.getItem("authUser");
    // setAuthUserDetails(JSON.parse(authUser!));
    authUser = JSON.parse(authUser!);
    // console.log(authUser);

    dispatch({
        type: SET_AUTH_USER,
        payload: authUser,
    });
};

export const updateProfileInfo = async (
    dispatch: Dispatch<any>,
    values: any
) => {
    try {
        const data = new FormData();
        const photo: any = {
            uri: values.profilePhoto[0].uri,
            name: values.profilePhoto[0].name,
            type: values.profilePhoto[0].type,
        };
        data.append("name", values.name);
        data.append("email", values.email);
        data.append("photo", photo);

        let authUser = await AsyncStorage.getItem("authUser");
        authUser = JSON.parse(authUser!);

        const response = await api.put(
            endPoints.updateProfile + authUser?._id,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        if (response.data.success) {
            // restoreAuthUser(response.data.data);
            logout(dispatch);
            // dispatch({
            //     type: UPDATE_PROFILE_SUCCESS,
            //     payload: "updated",
            // });
        }
    } catch (error: unknown) {
        console.error(error);
    }
};
