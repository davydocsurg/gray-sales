import {
    LOADING_STOCK_DATA,
    SET_STOCKS_DATA,
    SET_STOCK_ERRORS,
    SET_STOCK_SUCCESS,
} from "../types";

const stockReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case SET_STOCKS_DATA:
            return {
                ...state,
                stocks: payload,
                loading: false,
            };

        case SET_STOCK_ERRORS:
            return {
                ...state,
                errors: payload,
                loading: false,
            };

        case LOADING_STOCK_DATA:
            return {
                loading: payload,
            };

        case SET_STOCK_SUCCESS:
            return {
                success: true,
            };

        default:
            break;
    }
};

export default stockReducer;
