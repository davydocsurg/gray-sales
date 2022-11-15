import { createContext, useContext, useReducer } from "react";
import { AuthContextType } from "../types";
import authReducer from "./reducers/auth";
import { AuthState } from "./state";

const AuthContext = createContext<AuthContextType>({
    authState: {
        isLoggedIn: false,
        errors: [],
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
