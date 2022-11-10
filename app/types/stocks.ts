import { Dispatch } from "react";

export interface initialStockType {
    stocks: Array<any>;
    errors: Array<any>;
    loading: boolean;
}

export interface StockContextType {
    state: initialStockType;
    dispatch: Dispatch<any>;
}
