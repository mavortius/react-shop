import { BasketActions, BasketActionTypes, IBasketState } from "./basket-types";
import { Reducer } from "react";

export const defaultBasketState: IBasketState = {
  products: []
};

export const basketReducer: Reducer<IBasketState, BasketActions> =
  (state = defaultBasketState, action) => {
    switch (action.type) {
      case BasketActionTypes.ADD: {
        return {
          ...state,
          products: state.products.concat(action.product)
        };
      }
      default:
        return state;
    }
  };
