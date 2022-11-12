import apiClient from "./client";
import { endPoints } from "./endPoints";

const getListings = () => apiClient.get(endPoints.listings);

export const addListing = async (listing: any) => {
    const data = new FormData();

    data.append("title", listing.title);
    data.append("price", listing.price);
    data.append("categoryId", listing.category._id);
    data.append("description", listing.description);

    data.append("images", listing.images[0]);
    console.log(listing.images[0]);
    listing.images.forEach(({ image, index }: any) =>
        data.append("images", {
            name: "image" + index,
            type: "image/jpeg",
            uri: image,
        })
    );

    await fetch("http://20.20.0.44:8080/api/stock/create", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "multipart/form-data;",
        },
    });

    // return await apiClient.post("http://20.20.0.44:8080/api/stock/create");
};

export default {
    getListings,
    addListing,
};
