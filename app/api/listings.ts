import apiClient from "./client";
import { endPoints } from "./endPoints";

const getListings = () => apiClient.get(endPoints.listings);

export const addListing = (listing: any, onUploadProgress?: Function) => {
    const data = new FormData();
    data.append("title", listing.title);
    data.append("price", listing.price);
    data.append("categoryId", listing.category.value);
    data.append("description", listing.description);

    listing.images.forEach(({ image, index }: any) =>
        data.append("images", {
            name: "image" + index,
            type: "image/jpeg",
            uri: image,
        })
    );

    return apiClient.post(endPoints.addListing);
};

export default {
    getListings,
    addListing,
};
