import apiClient from "./client";
import { endPoints } from "./endPoints";

const getCategories = () => apiClient.get(endPoints.fetchCategories);

export default {
    getCategories,
};
