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

export interface AuthUserDetails {
    _v: Number;
    _id: string;
    createdAt: string;
    email: string;
    name: string;
    photo: string;
    role: string;
    slug: string;
    type: string;
    updatedAt: string;
    verificationStatus: string;
}
