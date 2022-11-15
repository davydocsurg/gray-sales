import { Dispatch } from "react";

interface initialAuthType {
    isLoggedIn: boolean;
}

export interface AuthContextType {
    authState: initialAuthType;
    authDispatch: Dispatch<any>;
}
