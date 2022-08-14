import React, { useEffect } from "react";
import { BurgerIngredients } from "../Burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../Burger-constructor/burger-constructor";
import appStyles from "./construcor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

export function Constructor() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (ingredientsFailed) {
    return <p>Данные не загружены</p>;
  }

  if (ingredientsRequest) {
    return <p>Данные загружаются...</p>;
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
