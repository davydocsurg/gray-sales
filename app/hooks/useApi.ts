import { useState } from "react";
import { ApiFunc } from "../types/api";
import type { ListingsApiRes } from "../types/listings";

const useApi = (apiFunc: any) => {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args: any) => {
        setLoading(true);
        console.log("got here too");

        const response = await apiFunc(...args);

        setLoading(false);

        if (!response.ok) return setError(true);

        setError(false);
        setData(response?.data);
    };

    return { data, error, loading, request };
};

export default useApi;
