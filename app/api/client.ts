import { create } from "apisauce";
import { BASE_URL } from "./constants";

export const baseURL = BASE_URL + "api";

const apiClient = create({
    baseURL: baseURL,
    // headers: {
    //     "Content-Type": "multipart/form-data;",
    // },
});

export default apiClient;
