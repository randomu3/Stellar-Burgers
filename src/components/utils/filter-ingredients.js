export function filterIngredients(ingredients, filterName) {
  return ingredients.filter((ingredient) => ingredient.type === filterName);
}
