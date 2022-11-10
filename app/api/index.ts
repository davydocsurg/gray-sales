import axios from "axios";
import {
    API_URL,
    NOT_FOUND,
    SERVER_ERROR,
    SERVICE_UNAVAILABLE,
} from "./constants";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.response.use(
    (response) => Promise.resolve(response),

    (error) => {
        let promise;

        if (axios.isCancel(error)) {
            promise = Promise.reject(error);
        } else {
            const { status, data } = error.response;

            switch (status) {
                case 0:
                    promise = Promise.reject({
                        type: "app",
                        content: SERVER_ERROR,
                    });
                    break;

                case 400:
                    promise = Promise.reject({
                        type: "field",
                        content: data.errors,
                    });
                    break;

                // case 401:
                //     if (!error.config.url.includes("login")) {
                //         localStorage.removeItem("auth-token");
                //         location.href = "/login";

                //         promise = Promise.reject({
                //             type: "app",
                //             content: UNAUTHORIZED,
                //         });
                //     } else {
                //         promise = Promise.reject({
                //             type: "app",
                //             content: data.message,
                //         });
                //     }
                //     break;

                case 404:
                    promise = Promise.reject({
                        type: "app",
                        content: NOT_FOUND,
                    });
                    break;

                case 500:
                    promise = Promise.reject({
                        type: "app",
                        content: SERVER_ERROR,
                    });
                    break;

                case 503:
                    promise = Promise.reject({
                        type: "app",
                        content: SERVICE_UNAVAILABLE,
                    });
                    break;

                default:
                    promise = Promise.reject({
                        type: "app",
                        content: data.message,
                    });
                    break;
            }
        }

        return promise;
    }
);

export default api;
