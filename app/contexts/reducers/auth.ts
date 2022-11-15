import { IS_AUTHENTICATED } from "../types";

const authReducer = (state: Object, { payload, type }: any) => {
    switch (type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isLoggedIn: payload,
            };

        default:
            break;
    }
};

export default authReducer;
