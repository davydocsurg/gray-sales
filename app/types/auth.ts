import { Dispatch } from "react";

interface initialAuthType {
    isLoggedIn: boolean;
    errors: [];
    loading: boolean;
}

export interface AuthContextType {
    authState: initialAuthType;
    authDispatch: Dispatch<any>;
}
