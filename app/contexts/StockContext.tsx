import { createContext, useContext, useReducer } from "react";

import { stockReducer } from "./reducers";
import { StockState } from "./state/stocks";

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

    const value = { state, dispatch };

    return (
        <StockContext.Provider value={value}>{children}</StockContext.Provider>
    );
};
