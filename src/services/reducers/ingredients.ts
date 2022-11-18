import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  IGetIngredientsActions,
} from "../actions/ingredients";
import { TItem } from "../types/data";

export type TIngredientsState = {
  ingredients: Array<TItem>; // check
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

// список всех полученных ингредиентов
const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,
};

// reducer
export const ingredientsReducer = (
  state = initialState,
  action: IGetIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
        ...state,
         ingredientsFailed: true, 
         ingredientsRequest: false
         };
    }
    default:
      return state;
  }
};
