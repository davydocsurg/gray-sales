import apiClient from "./client";
import { endPoints } from "./endPoints";

const getListings = () => apiClient.get(endPoints.listingsEndpoint);

export default {
    getListings,
};
