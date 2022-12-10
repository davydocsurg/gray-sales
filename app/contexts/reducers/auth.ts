import {
    IS_AUTHENTICATED,
    LOADING_AUTH,
    NOT_AUTHENTICATED,
    SET_AUTH_ERRORS,
    SET_AUTH_USER,
    STOP_LOADING_AUTH,
    UPDATE_PROFILE_SUCCESS,
} from "../types";

const authReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case LOADING_AUTH:
            console.log("====================================");
            console.log(state, "state");
            console.log("====================================");
            return {
                ...state,
                // isLoggedIn: false,
                errors: [],
                loading: payload,
            };

        case STOP_LOADING_AUTH:
            return {
                loading: payload,
            };

        case IS_AUTHENTICATED:
            return {
                isLoggedIn: payload,
            };

        case NOT_AUTHENTICATED:
            return {
                isLoggedIn: payload,
            };

        case SET_AUTH_ERRORS:
            return {
                // ...state,
                errors: payload,
                loading: false,
            };

        case SET_AUTH_USER:
            return {
                isLoggedIn: true,
                user: payload,
            };

        case UPDATE_PROFILE_SUCCESS:
            return {
                profileUpdateSuccess: payload,
            };
        default:
            break;
    }
};

export default authReducer;
