import { IProduct } from "../products/products-data";
import { BasketActions, BasketActionTypes, IBasketAdd } from "./basket-types";
import { Dispatch } from "react";

export const addToBasket = (dispatch: Dispatch<BasketActions>, product: IProduct) => {
  dispatch(
    {
      product,
      type: BasketActionTypes.ADD
    }
  )
};
