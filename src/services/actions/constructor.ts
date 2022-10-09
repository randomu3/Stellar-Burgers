import { TItem } from "../types/data";
export const ADD_FILLING = "ADD_FILLING";
export const ADD_BUN = "ADD_BUN";
export const DELETE_FILLING = "DELETE_FILLING";
export const MOVE_FILLING = "MOVE_ITEM";
export const REFRESH_INGREDIENTS = "REFRESH_INGREDIENTS";

export interface IConstructorAddFillingAction {
  readonly type: typeof ADD_FILLING;
  readonly payload: TItem;
}
export interface IConstructorAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly payload: TItem;
}
export interface IConstructorDeleteFillingAction {
  readonly type: typeof DELETE_FILLING;
  readonly payload: number;
}
export interface IConstructorMoveFillingAction {
  readonly type: typeof MOVE_FILLING;
  readonly payload: {
    dragIndex: number;
    hoverIndex: number;
  };
}
export interface IConstructorRefreshIngredientsAction {
  readonly type: typeof REFRESH_INGREDIENTS;
  readonly payload: TItem;
}

export type TCounstructorActions =
  | IConstructorAddFillingAction
  | IConstructorAddBunAction
  | IConstructorDeleteFillingAction
  | IConstructorMoveFillingAction
  | IConstructorRefreshIngredientsAction;

export const addFilling = (payload: TItem) => ({
  type: ADD_FILLING,
  payload,
});
export const addBun = (payload: TItem): TCounstructorActions => ({
  type: ADD_BUN,
  payload,
});
export const delFilling = (payload: number): TCounstructorActions => ({
  type: DELETE_FILLING,
  payload,
});
export const moveFilling = (payload: {
  dragIndex: number;
  hoverIndex: number;
}): TCounstructorActions => ({
  type: MOVE_FILLING,
  payload,
});
