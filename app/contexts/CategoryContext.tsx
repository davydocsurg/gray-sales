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
    dispatch: () => {},
});
export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }: any): JSX.Element => {
    const [state, dispatch] = useReducer<any>(categoryReducer, CategoryState);

    const value = { state, dispatch };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};
