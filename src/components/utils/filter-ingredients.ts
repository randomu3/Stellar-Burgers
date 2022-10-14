import { TItem } from "../../services/types/data";

export function filterIngredients(ingredients: Array<TItem>, filterName: string) {
  return ingredients.filter((ingredient) => ingredient.type === filterName);
}
