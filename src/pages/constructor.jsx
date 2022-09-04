import React from "react";
import { BurgerIngredients } from "../components/Burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/Burger-constructor/burger-constructor";
import appStyles from "./construcor.module.css";
import { useSelector } from "react-redux";

export function ConstructorPage () {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );

  if (ingredientsFailed) {
    return <p>...</p>;
  }

  if (ingredientsRequest) {
    return <p>...</p>;
  }

  return (
    <div className={appStyles.app}>
      {/* <AppHeader /> */}
      <main className={appStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
