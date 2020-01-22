import React, { createContext, useContext, useReducer } from "react";
import { IProductsState, ProductsActions } from "./products-types";
import { defaultProductState, productsReducer } from "./products-reducer";

const initialProductsContext: { productsState: IProductsState, setProductsState: React.Dispatch<ProductsActions> } = {
  productsState: defaultProductState,
  setProductsState: () => {}
};

const ProductsContext = createContext(initialProductsContext);

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, defaultProductState);

  return <ProductsContext.Provider value={{ productsState: state, setProductsState: dispatch }}>{children}</ProductsContext.Provider>
};

export const useProductsState = () => useContext(ProductsContext);





