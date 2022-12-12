import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import api from "../api";
import { endPoints } from "../api/endPoints";
import type {
    AuthStateType,
    AuthUserDetails,
    initialAuthType,
    LoginFields,
    ProfileUpdateFields,
} from "../types";
import authReducer from "./reducers/auth";
import { AuthState } from "./state";

type AuthContextType = {
    authUser: initialAuthType;
    handleLogin: (fields: LoginFields) => void;
    handleLogout: () => void;
    handleFetchAuthUserData: () => void;
    handleProfileUpdate: (fields: ProfileUpdateFields) => void;
    // handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

type AuthUserType = {
    authUser: initialAuthType;
};

const authUserKey = "auth-user";
const authTokenKey = "auth-token";

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

const getAuthUserData = async (): Promise<AuthUserDetails> => {
    try {
        const result = await AsyncStorage.getItem(authUserKey);
        if (result) {
            return JSON.parse(result);
        }
    } catch (error: unknown) {
        console.error(error);
    }
    return userFields;
};

const setAuthToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(authTokenKey, token);
    } catch (error: unknown) {
        console.error(error);
    }
};

const getAuthToken = async (): Promise<string | null> => {
    try {
        const result = await AsyncStorage.getItem(authTokenKey);
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
    handleLogin: () => {},
    handleLogout: () => {},
    handleFetchAuthUserData: () => {},
    handleProfileUpdate: () => {},
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

    useEffect(() => {
        getAuthTokenFromStorage();
        // console.log(authUser.isLoggedIn);
    }, []);

    const handleLogin = useCallback(async (fields: LoginFields) => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await api.post(endPoints.login, {
                email: fields.email,
                password: fields.password,
            });

            if (response.data?.success === false) {
                return setErrors(response.data?.message);
            }

            await setAuthToken(response.data?.token);
            await setAuthUserData(response.data?.user);
            setIsLoggedIn(true);
        } catch (error: Object | any) {
            console.error(error?.content);
            setErrors(error?.content);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(authTokenKey);
            setIsLoggedIn(false);
        } catch (error: Object | any) {
            console.error(error);
            setErrors(error);
        }
    }, []);

    const setLoading = (payload: boolean) => {
        setAuthUser({
            ...authUser,
            loading: payload,
        });
    };

    const setErrors = (payload: any) => {
        setAuthUser({
            ...authUser,
            errors: payload,
        });
    };

    const setIsLoggedIn = (payload: boolean) => {
        setAuthUser({
            ...authUser,
            isLoggedIn: payload,
        });
    };

    const getAuthTokenFromStorage = async () => {
        const token = await getAuthToken();
        if (token) {
            setIsLoggedIn(true);

            setAuthUser({
                ...authUser,
                isLoggedIn: true,
            });
        }
    };

    const handleFetchAuthUserData = async () => {
        const authUserData = await getAuthUserData();
        // console.log(authUserData);

        setAuthUser({
            ...authUser,
            user: authUserData,
        });
    };

    const setProfileUpdate = (payload: string) => {
        setAuthUser({
            ...authUser,
            profileUpdateSuccess: payload,
        });
    };

    const handleProfileUpdate = useCallback(
        async (values: ProfileUpdateFields) => {
            try {
                setLoading(true);
                setErrors(null);
                const data = new FormData();
                // console.log(values.profilePhoto, "log");

                const photo: any = {
                    uri: values.profilePhoto[0].uri,
                    name: values.profilePhoto[0].name,
                    type: values.profilePhoto[0].type,
                };
                data.append("name", values.name);
                data.append("email", values.email);
                data.append("photo", photo);

                let authUserLocal = await AsyncStorage.getItem(authUserKey);
                authUserLocal = JSON.parse(authUserLocal!);
                console.log(authUserLocal?._id, "direct");
                // handleFetchAuthUserData();
                // console.log(authUser.user._id, "id");

                const response = await api.put(
                    endPoints.updateProfile + authUserLocal?._id,
                    data,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (response.data?.success) {
                    await setAuthUserData(response.data?.data?.updatedData);
                    // setProfileUpdate("updated");
                    console.log(authUser);

                    return response.data?.success;
                }
                setLoading(false);
            } catch (error: unknown) {
                setErrors(error);
                console.error(authUser.errors);
            }
        },
        []
    );

    return (
        <AuthContext.Provider
            value={{
                authUser,
                handleLogin,
                handleLogout,
                handleFetchAuthUserData,
                handleProfileUpdate,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
