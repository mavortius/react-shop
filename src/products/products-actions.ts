import { Dispatch } from "react";
import { getProduct as getProductFromAPI, getProducts as getProductsFromAPI } from "./products-data";
import { ProductsActions, ProductsActionTypes } from "./products-types";

export const loading = () => ({
  type: ProductsActionTypes.LOADING,
  products: [],
  product: null
});

export const getProducts = async (dispatch: Dispatch<ProductsActions>) => {
  dispatch(loading());

  const products = await getProductsFromAPI();

  dispatch({
    products,
    type: ProductsActionTypes.GET_ALL
  });
};

export const getProduct = async (dispatch: Dispatch<ProductsActions>, id: number) => {
  dispatch(loading());

  const product = await getProductFromAPI(id);

  dispatch({
    product,
    type: ProductsActionTypes.GET_SINGLE
  });
};
