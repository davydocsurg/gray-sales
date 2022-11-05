import { create } from "apisauce";

const baseURL = "http://20.20.0.90:8080/api";

// export const createConnection = async () => {
//     const apiClient = create({
//         baseURL: baseURL,
//     });

//     const response = await apiClient.get("/fetch");
//     if (!response.ok) {
//     }
// };

const apiClient = create({
    baseURL: "http://192.168.0.101:8080/api",
});

export default apiClient;
