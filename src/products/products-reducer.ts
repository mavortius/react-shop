import { Reducer } from "react";
import { IProductsState, ProductsActions, ProductsActionTypes } from "./products-types";

export const defaultProductState: IProductsState = {
  products: [],
  currentProduct: null,
  productsLoading: false
};

export const productsReducer: Reducer<IProductsState, ProductsActions> =
  (state = defaultProductState, action) => {
    switch (action.type) {
      case ProductsActionTypes.LOADING: {
        return {
          ...state,
          productsLoading: true
        };
      }
      case ProductsActionTypes.GET_ALL: {
        return {
          ...state,
          products: action.products,
          productsLoading: false
        };
      }
      case ProductsActionTypes.GET_SINGLE: {
        return {
          ...state,
          currentProduct: action.product,
          productsLoading: false
        };
      }
      default:
        return defaultProductState;
    }
  };
