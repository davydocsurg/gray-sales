import {
    createContext,
    useContext,
    useReducer,
    Dispatch,
    FunctionComponent,
} from "react";
import api from "../api";
import { endPoints } from "../api/endPoints";
import { fetchStocks } from "./actions";
import { stockReducer } from "./reducers";
import { StockState } from "./state/stocks";
import { LOADING_STOCK_DATA, SET_STOCKS_DATA, SET_STOCK_ERRORS } from "./types";

import type { initialStockType, StockContextType } from "../types";

const StockContext = createContext<StockContextType>({
    state: {
        stocks: [],
        errors: [],
        loading: false,
    },
    dispatch: () => {},
});
export const useStockContext = () => useContext(StockContext);

const initStocks = (StockState: initialStockType) => {
    return { stocks: StockState };
};

export const StockProvider = ({ children }: any): JSX.Element => {
    const [state, dispatch] = useReducer<any>(stockReducer, StockState);

    // const fetchStocks = () => {
    //     async (dispatch: any) => {
    //         console.log("helolo");
    //         try {
    //             dispatch({
    //                 type: LOADING_STOCK_DATA,
    //             });

    //             const response = await api.get(endPoints.stocks);
    //             return dispatch({
    //                 type: SET_STOCKS_DATA,
    //                 payload: response.data,
    //             });
    //         } catch (error) {
    //             console.error(error);

    //             return dispatch({
    //                 type: SET_STOCK_ERRORS,
    //                 payload: error,
    //             });
    //         }
    //     };
    // };
    const value = { state, dispatch };

    return (
        <StockContext.Provider value={value}>{children}</StockContext.Provider>
    );
};
