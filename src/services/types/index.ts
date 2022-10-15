// types/index.ts
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AppDispatch, RootState } from "../"; // change
import { TAuthActions } from "../actions/auth";
import { TCounstructorActions } from "../actions/constructor";
import { ISetInfoIngredientAction } from "../actions/currentIngredient";
import { TPostOrderActions } from "../actions";
import { IGetIngredientsActions } from "../actions/ingredients";

// Типизация всех экшенов приложения
type TApplicationActions =
  | TAuthActions
  | TCounstructorActions
  | ISetInfoIngredientAction
  | TPostOrderActions
  | IGetIngredientsActions;

// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = (data?:any) => (dispatch: TypedDispatch) => TReturn;

export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction> &
  AppDispatch;
