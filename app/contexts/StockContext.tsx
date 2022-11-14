import React, {
    createContext,
    ReactChildren,
    useContext,
    useMemo,
    useReducer,
} from "react";

import { stockReducer } from "./reducers";
import { StockState } from "./state/stocks";

import type { initialStockType, StockContextType } from "../types";

const StockContext = createContext<StockContextType>({
    stockState: {
        stocks: [],
        errors: [],
        loading: false,
        success: false,
    },
    stockDispatch: () => {},
});
export const useStockContext = () => useContext(StockContext);

const initStocks = (StockState: initialStockType) => {
    return { stocks: StockState };
};

export const StockProvider = ({ children }: any): JSX.Element => {
    const [stockState, stockDispatch] = useReducer<any>(
        stockReducer,
        StockState
    );

    const value = { stockState, stockDispatch };
    // const stockMemo = useMemo(() => [stockState?.stocks], [stockState.stocks]);
    return (
        <StockContext.Provider value={value}>{children}</StockContext.Provider>
    );
};
