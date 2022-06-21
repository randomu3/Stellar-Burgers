import React from "react";
import { AppHeader } from "../Header/header";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

import appStyles from "./app.module.css";

export const App = () => {
  return (
    <div className={appStyles.app}>
        <AppHeader /> 
      <main className={appStyles.main}>
        <section>
          <BurgerIngredients />
        </section>
        <section>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
};
