import apiClient from "./client";
import { endPoints } from "./endPoints";

export const getListings = () => apiClient.get(endPoints.listingsEndpoint);
