import {
    LOADING_CATEGORIES_DATA,
    SET_CATEGORIES_DATA,
    SET_CATEGORIES_ERROR,
} from "../types";

const categoryReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case SET_CATEGORIES_DATA:
            return {
                ...state,
                categories: payload,
                loading: false,
            };

        case SET_CATEGORIES_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false,
            };

        case LOADING_CATEGORIES_DATA:
            return {
                loading: true,
            };

        default:
            break;
    }
};

export default categoryReducer;
