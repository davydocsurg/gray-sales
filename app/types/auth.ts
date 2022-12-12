import { Dispatch } from "react";

export interface initialAuthType {
    isLoggedIn: boolean;
    errors: [];
    user: AuthUserDetails;
    loading: boolean;
    profileUpdateSuccess: string;
}

export interface AuthStateType {
    authUser: initialAuthType;
}

export type LoginFields = {
    email: string;
    password: string;
};

export type ProfileUpdateFields = {
    name: string;
    email: string;
    profilePhoto: photoDetails | any;
    // photo: {
    //     profilePhoto: photoDetails;
    // };
};

type photoDetails = {
    uri: string;
    name: string;
    type: string;
};

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
