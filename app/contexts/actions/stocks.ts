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
    stock: any,
    image: any,
    onUploadProgress: Function
) => {
    try {
        // const data = new FormData();

        // data.append("title", stock.title);
        // data.append("description", stock.description);
        // data.append("price", stock.price);
        // data.append("categoryId", stock.category._id);

        // data.append("images", {
        //     name: stock.images.fileName,
        //     type: stock.images.type,
        //     uri:
        //         Platform.OS === "ios"
        //             ? stock.images.uri.replace("file://", "")
        //             : stock.images.uri,
        // });
        const headers = {
            "Content-type": "application/json",
        };
        const response = await api.post(
            endPoints.createStock,
            {
                title: stock.title,
                description: stock.description,
                price: stock.price,
                categoryId: stock.category._id,
                images: stock.images,
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
