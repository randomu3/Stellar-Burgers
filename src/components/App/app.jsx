import React, { useEffect, useState } from "react";
import { AppHeader } from "../header/header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

import appStyles from "./app.module.css";

import { getIngredients } from "../utils/burger-api";

export const App = () => {
  const [items, setItems] = useState([]);
  const [isError, setError] = useState(false);
  useEffect(() => {
    getIngredients()
      .then((result) => setItems(result))
      .catch(() => setError(true));
  }, []);

  if (isError) {
    alert(`Данные по ингредиентам не загружены`);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={items} />
        <BurgerConstructor />
      </main>
    </div>
  );
};
