import { IS_AUTHENTICATED, SET_AUTH_ERRORS } from "../types";

const authReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isLoggedIn: payload,
            };

        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: payload,
            };

        default:
            break;
    }
};

export default authReducer;
