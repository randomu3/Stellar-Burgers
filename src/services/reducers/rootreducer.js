import { combineReducers } from "redux";
import { createdOrder } from ".";
import { ingredientsConstructorReducer } from "./constructor";
import { currentIngredientReducer } from "./currentIngredient";
import { ingredientsReducer } from "./ingredients";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  currentIngredient: currentIngredientReducer,
  postOrder: createdOrder,
});
