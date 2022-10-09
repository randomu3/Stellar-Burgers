// types/index.ts
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../"; // change
import { TAuthActions } from "../actions/auth";
import { TCounstructorActions } from "../actions/constructor";
import { ISetInfoIngredientAction } from "../actions/currentIngredient";
import { TPostOrderActions } from "../actions";
import { IGetIngredientsActions } from "../actions/ingredients";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TAuthActions
  | TCounstructorActions
  | ISetInfoIngredientAction
  | TPostOrderActions
  | IGetIngredientsActions;

// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
