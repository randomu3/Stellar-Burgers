import React, { useEffect, useState } from "react";
import { AppHeader } from "../Header/header";
import { BurgerIngredients } from "../Burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../Burger-constructor/burger-constructors";
import { BurgerContext } from "../../services/burgerContext";

import appStyles from "./app.module.css";

import { getIngredients } from "../utils/burger-api";
import { OrdersContext } from "../../services/ordersContext";

export const App = () => {
  const [items, setItems] = useState([]);
  const [isError, setError] = useState(false);
  const [orders, setOrders] = useState({
    bun: "",
    othersProducts: [],
  });

  useEffect(() => {
    getIngredients()
      .then((result) => {
        setItems(result);
        setOrders({
          bun: result.find((order) => order.type === "bun"),
          othersProducts: result.filter((order) => order.type !== "bun"),
        });
      })
      .catch(() => setError(true));
  }, []);

  if (isError) {
    alert(`Данные по ингредиентам не загружены`);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerContext.Provider value={{ items }}>
          <OrdersContext.Provider value={{ orders }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OrdersContext.Provider>
        </BurgerContext.Provider>
      </main>
    </div>
  );
};
