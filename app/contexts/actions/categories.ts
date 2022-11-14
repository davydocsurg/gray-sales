import { Dispatch } from "react";
import api from "../../api";
import { endPoints } from "../../api/endPoints";
import {
    LOADING_CATEGORIES_DATA,
    SET_CATEGORIES_DATA,
    SET_CATEGORIES_ERROR,
} from "../types";

export const fetchCategories = async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: LOADING_CATEGORIES_DATA,
        });
        const response = await api.get(endPoints.fetchCategories);

        return dispatch({
            type: SET_CATEGORIES_DATA,
            payload: response.data.data.categories,
        });
    } catch (error) {
        console.error(error);

        dispatch({
            type: SET_CATEGORIES_ERROR,
            payload: error,
        });
    }
};
