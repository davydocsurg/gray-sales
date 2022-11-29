import {
    IS_AUTHENTICATED,
    LOADING_AUTH,
    SET_AUTH_ERRORS,
    SET_AUTH_USER,
} from "../types";

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
                // ...state,
                isLoggedIn: true,
                // loading: false,
            };

        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: payload,
                loading: false,
            };

        case SET_AUTH_USER:
            return {
                ...state,
                isLoggedIn: true,
                users: payload,
            };

        default:
            break;
    }
};

export default authReducer;
