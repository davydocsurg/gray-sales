import { IS_AUTHENTICATED, LOADING_AUTH, SET_AUTH_ERRORS } from "../types";

const authReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case LOADING_AUTH:
            return {
                ...state,
                isLoggedIn: false,
                errors: [],
                loading: true,
            };
        case IS_AUTHENTICATED:
            return {
                ...state,
                isLoggedIn: payload,
                loading: false,
            };

        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: payload,
                loading: false,
            };

        default:
            break;
    }
};

export default authReducer;
