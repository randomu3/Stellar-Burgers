import React, { Children, useEffect, useState } from "react";
import { AppHeader } from "../Header/header";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

import appStyles from "./app.module.css";

export const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const URL = "https://norma.nomoreparties.space/api/ingredients";
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then(({ data }) => {
        // console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <section>
          <BurgerIngredients ingredients={items} />
        </section>
        <section>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
};
