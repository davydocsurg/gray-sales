import { Dispatch } from "react";
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import {
    LOADING_STOCK_DATA,
    SET_STOCKS_DATA,
    SET_STOCK_ERRORS,
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
