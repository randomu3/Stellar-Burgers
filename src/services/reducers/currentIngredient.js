import { SET_INFO_INGREDIENT } from "../actions/currentIngredient";

const initialState = {
  data: null,
};

// reducer
export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO_INGREDIENT: {
      return {
        data: action.data,
      };
    }
    default:
      return state;
  }
};
