import { Dispatch } from "react";

interface initialAuthType {
    isLoggedIn: boolean;
    errors: [];
}

export interface AuthContextType {
    authState: initialAuthType;
    authDispatch: Dispatch<any>;
}
