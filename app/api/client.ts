import { create } from "apisauce";

export const baseURL = "http://192.168.0.100:8080/api";

// export const createConnection = async () => {
//     const apiClient = create({
//         baseURL: baseURL,
//     });

//     const response = await apiClient.get("/fetch");
//     if (!response.ok) {
//     }
// };

const apiClient = create({
    baseURL: baseURL,
});

export default apiClient;
