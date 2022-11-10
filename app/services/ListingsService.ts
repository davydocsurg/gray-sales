import api from "../api";
import { endPoints } from "../api/endPoints";

export const FetchStocks = async () => {
    console.log("senr");

    return await api.get(endPoints.stocks);
};
