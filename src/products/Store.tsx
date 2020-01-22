import React, { createContext, useContext, useReducer } from "react";
import { IProductsState, ProductsActions } from "./products-types";
import { defaultProductState, productsReducer } from "./products-reducer";
import { basketReducer, defaultBasketState } from "../basket/basket-reducer";
import { BasketActions, IBasketState } from "../basket/basket-types";

type ContextType = {
  productsState: IProductsState,
  setProductsState: React.Dispatch<ProductsActions>,
  basketState: IBasketState,
  setBasketState: React.Dispatch<BasketActions>
}

const initialContext: ContextType = {
  productsState: defaultProductState,
  setProductsState: () => {
  },
  basketState: defaultBasketState,
  setBasketState: () => {
  }
};

const AppContext = createContext(initialContext);

export const StoreProvider: React.FC = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(productsReducer, defaultProductState);
  const [basketState, basketDispatch] = useReducer(basketReducer, defaultBasketState);

  return <AppContext.Provider
    value={{
      productsState,
      setProductsState: productsDispatch,
      basketState,
      setBasketState: basketDispatch
    }}>{children}</AppContext.Provider>
};

export const useStoreState = () => useContext(AppContext);





