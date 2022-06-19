import React from "react";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { data } from "../utils/data.js";

import ingredientsStyles from "./BurgerIngredients.module.css";

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

const Ingredients = ({ ingredients }) => {
  return (
    <ul className={`pb-10 pt-6 pl-4 pr-4 ${ingredientsStyles.ul}`}>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className={ingredientsStyles.li}>
          <div className={`pr-4 pl-4 pb-1`}>
            <img className={``} id={ingredient.id} src={ingredient.image}></img>
            <p
              className={`mt-1 mb-1 text text_type_digits-default ${ingredientsStyles.price}`}
            >
              {ingredient.price}
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <p className={`text text_type_main-default ${ingredientsStyles.description}`}>{ingredient.name}</p>
        </li>
      ))}
    </ul>
  );
};

export const BurgerIngredients = () => {
  return (
    <div className="mt-10">
      <h1 className="text mb-5 text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <div className={`mt-10 ${ingredientsStyles.ingredients}`}>
        <div>
          <h2 className="text text_type_main-medium">Булки</h2>
          <Ingredients ingredients={data.filter((e) => e.type === "bun")} />
        </div>
        <div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <Ingredients ingredients={data.filter((e) => e.type === "sauce")} />
        </div>
        <div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <Ingredients ingredients={data.filter((e) => e.type === "main")} />
        </div>
      </div>
    </div>
  );
};
