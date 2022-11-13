import { Dispatch } from "react";
import { Platform } from "react-native";
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import {
    LOADING_STOCK_DATA,
    SET_STOCKS_DATA,
    SET_STOCK_ERRORS,
    SET_STOCK_SUCCESS,
} from "../types";

export const fetchStocks = async (dispatch: Dispatch<any>) => {
    // return async (dispatch: Function) => {

    try {
        dispatch({
            type: LOADING_STOCK_DATA,
        });
        const response = await api.get(endPoints.stocks);
        return dispatch({
            type: SET_STOCKS_DATA,
            payload: response.data.data.stocks,
        });
    } catch (error) {
        console.error(error);

        dispatch({
            type: SET_STOCK_ERRORS,
            payload: error,
        });
    }
    // };
};

export const createStock = async (
    dispatch: Dispatch<any>,
    values: any,
    image: any,
    onUploadProgress: Function
) => {
    try {
        // const data = new FormData();

        // data.append("title", values.title);
        // data.append("description", values.description);
        // data.append("price", values.price);
        // data.append("categoryId", values.category._id);

        // data.append("images", {
        //     name: values.images.fileName,
        //     type: values.images.type,
        //     uri:
        //         Platform.OS === "ios"
        //             ? values.images.uri.replace("file://", "")
        //             : values.images.uri,
        // });
        const headers = {
            "Content-type": "application/json",
        };
        const response = await api.post(
            endPoints.createStock,
            {
                title: values.title,
                description: values.description,
                price: values.price,
                categoryId: values.category._id,
                images: values.images,
            },
            {
                onUploadProgress: (progress) =>
                    onUploadProgress(progress.loaded / progress.total!),
            }
        );

        if (response.data.success) {
            dispatch({
                type: SET_STOCK_SUCCESS,
            });
        }
    } catch (error) {
        console.error(error);
        dispatch({
            type: SET_STOCK_ERRORS,
            payload: error,
        });
    }
};
