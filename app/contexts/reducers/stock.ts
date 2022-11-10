import { SET_STOCKS_DATA, SET_STOCK_ERRORS } from "../types";

const stockReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case SET_STOCKS_DATA:
            return {
                ...state,
                data: payload,
            };

        case SET_STOCK_ERRORS:
            return {
                ...state,
                errors: payload,
            };

        default:
            break;
    }
};

export default stockReducer;
