import { Dispatch } from "react";

export interface initialCategoryType {
    categories: Array<any>;
    errors: Array<any>;
    loading: boolean;
}

export interface CategoryContextType {
    state: initialCategoryType;
    dispatch: Dispatch<any>;
}
