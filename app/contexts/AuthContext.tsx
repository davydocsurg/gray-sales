import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useReducer, useState } from "react";
import { AuthStateType, initialAuthType } from "../types";
import authReducer from "./reducers/auth";
import { AuthState } from "./state";

type AuthContextType = {
    authUser: initialAuthType;
    // handleMoodSelect: (mood: MoodOptionType) => void;
    // handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

type AuthUserType = {
    authUser: initialAuthType;
};

const authUserKey = "auth-user";
const authToken = "auth-token";

const userFields = {
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
};

const setAuthUserData = async (authUser: initialAuthType): Promise<void> => {
    try {
        const processedData = JSON.stringify(authUser);
        await AsyncStorage.setItem(authUserKey, processedData);
    } catch (error: unknown) {
        console.error(error);
    }
};

const getAuthUserData = async (): Promise<AuthUserType | null> => {
    try {
        const result = await AsyncStorage.getItem(authUserKey);
        if (result) {
            return JSON.parse(result);
        }
    } catch (error: unknown) {
        console.error(error);
    }
    return null;
};

const getAuthToken = async (): Promise<string | null> => {
    try {
        const result = await AsyncStorage.getItem(authToken);
        if (result) {
            return result;
        }
    } catch (error: unknown) {
        console.error(error);
    }
    return null;
};

const AuthContext = createContext<AuthContextType>({
    authUser: {
        errors: [],
        isLoggedIn: false,
        loading: false,
        profileUpdateSuccess: "",
        user: userFields,
    },
});

export const AuthProvider: React.FC = ({
    children,
}: React.EmbedHTMLAttributes<any>) => {
    const [authUser, setAuthUser] = useState<initialAuthType>({
        errors: [],
        isLoggedIn: false,
        loading: false,
        profileUpdateSuccess: "",
        user: userFields,
    });

    const getAuthTokenFromStorage = async () => {
        const token = await getAuthToken();
        if (token) {
            setAuthUser({
                ...authUser,
                isLoggedIn: true,
            });
        }
    };

    return (
        <AuthContext.Provider value={{ authUser }}>
            {children}
        </AuthContext.Provider>
    );
};
