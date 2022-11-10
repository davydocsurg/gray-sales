import api from "../../api";
import { endPoints } from "../../api/endPoints";
import { LOADING_DATA, SET_STOCKS_DATA, SET_STOCK_ERRORS } from "../types";

export const fetchStocks = () => {
    return async (dispatch: Function) => {
        dispatch({
            type: LOADING_DATA,
        });

        try {
            const response = await api.get(endPoints.stocks);
            dispatch({
                type: SET_STOCKS_DATA,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);

            dispatch({
                type: SET_STOCK_ERRORS,
                payload: error,
            });
        }
    };
};
