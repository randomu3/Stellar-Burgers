import {
  SET_INFO_INGREDIENT,
  ISetInfoIngredientAction,
} from "../actions/currentIngredient";
import { TItem } from "../types/data";

export type TInfoIngredient = {
  data: null | TItem;
};

const initialState: TInfoIngredient = {
  data: null,
};

// reducer
export const currentIngredientReducer = (
  state = initialState,
  action: ISetInfoIngredientAction
) => {
  switch (action.type) {
    case SET_INFO_INGREDIENT: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};
