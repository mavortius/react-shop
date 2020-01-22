import { IProduct } from "./products-data";

export enum ProductsActionTypes {
  GET_ALL = "PRODUCTS/GET_ALL",
  GET_SINGLE = "PRODUCTS/GET_SINGLE",
  LOADING = "PRODUCTS/LOADING"
}

export interface IProductsGetAllAction {
  type: ProductsActionTypes.GET_ALL,
  products: IProduct[]
}

export interface IProductsGetSingleAction {
  type: ProductsActionTypes.GET_SINGLE;
  product: IProduct | null;
}

export interface IProductsLoadingAction {
  type: ProductsActionTypes.LOADING
}

export type ProductsActions =
  | IProductsGetAllAction
  | IProductsGetSingleAction
  | IProductsLoadingAction

export interface IProductsState {
  readonly products: IProduct[];
  readonly productsLoading: boolean;
  readonly currentProduct: IProduct | null;
}
