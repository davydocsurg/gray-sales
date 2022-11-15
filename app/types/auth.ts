import { Dispatch } from "react";

interface initialAuthType {
    isLoggedIn: boolean;
    errors: [];
    user: [];
    loading: boolean;
}

export interface AuthContextType {
    authState: initialAuthType;
    authDispatch: Dispatch<any>;
}
