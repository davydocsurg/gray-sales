import { createContext, useContext, useReducer } from "react";
import { AuthContextType } from "../types";
import authReducer from "./reducers/auth";
import { AuthState } from "./state";

const AuthContext = createContext<AuthContextType>({
    authState: {
        loading: false,
        isLoggedIn: false,
        errors: [],
        user: {
            _id: "",
            _v: 0,
            createdAt: "",
            email: "",
            name: "",
            photo: "",
            role: "",
            slug: "",
            type: "",
            updatedAt: "",
            verificationStatus: "",
        },
    },
    authDispatch: () => {},
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [authState, authDispatch] = useReducer<any>(authReducer, AuthState);

    const value = { authState, authDispatch };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
