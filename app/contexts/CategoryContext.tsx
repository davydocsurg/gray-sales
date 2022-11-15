import { createContext, useContext, useReducer } from "react";

import { categoryReducer } from "./reducers";

import type { CategoryContextType } from "../types";
import { CategoryState } from "./state";

const CategoryContext = createContext<CategoryContextType>({
    categoryState: {
        categories: [],
        errors: [],
        loading: false,
    },
    categoryDispatch: () => {},
});
export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }: any): JSX.Element => {
    const [categoryState, categoryDispatch] = useReducer<any>(
        categoryReducer,
        CategoryState
    );

    const value = { categoryState, categoryDispatch };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};
