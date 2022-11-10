import api from "../api";
import { endPoints } from "../api/endPoints";

export const FetchStocks = async () => {
    return await api.get(endPoints.stocks);
};
