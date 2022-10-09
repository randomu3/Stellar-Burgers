import { TItem } from "../types/data";

export const SET_INFO_INGREDIENT = "GET_INFO_INGREDIENT";

export interface ISetInfoIngredientAction {
  readonly type: typeof SET_INFO_INGREDIENT;
  readonly data: TItem;
}

export function setInfoIngredient(data: TItem): ISetInfoIngredientAction {
  return { type: SET_INFO_INGREDIENT, data };
}
