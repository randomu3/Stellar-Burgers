import React, { useCallback, useState } from "react";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientsStyles from "./burger-ingredients.module.css";

import PropTypes from "prop-types";
import { IngredientDetails } from "../Ingredient-details/ingredient-details.jsx";
import { filterIngredients } from "../utils/filter-ingredients";
import { ingredientPropType } from "../utils/ingredients-shape";

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={ingredientsStyles.tab}>
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
  const [isShow, setShow] = useState(false);
  const [content, setContent] = useState();

  function openModal(content) {
    setShow(true);
    setContent(content);
  }

  const closeModal = useCallback(() => {
    setShow(false);
    setContent(null);
  }, []);

  return (
    <>
      {isShow && (
        <IngredientDetails
          data={content}
          closeModal={closeModal}
        ></IngredientDetails>
      )}
      <ul className={`pb-10 pt-6 pl-4 pr-4 ${ingredientsStyles.ul}`}>
        {ingredients.map((ingredient) => (
          <li
            onClick={() => openModal(ingredient)}
            key={ingredient._id}
            className={ingredientsStyles.li}
          >
            <div className={`pr-4 pl-4 pb-1`}>
              <img
                id={ingredient.id}
                src={ingredient.image}
                alt={ingredient.name}
              ></img>
              <p
                className={`mt-1 mb-1 text text_type_digits-default ${ingredientsStyles.price}`}
              >
                {ingredient.price}
                <CurrencyIcon type="primary" />
              </p>
            </div>
            <p
              className={`text text_type_main-default ${ingredientsStyles.description}`}
            >
              {ingredient.name}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export const BurgerIngredients = ({ ingredients }) => {
  return (
    <div className="mt-10">
      <h1 className="text mb-5 text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <div className={`mt-10 ${ingredientsStyles.ingredients}`}>
        <div>
          <h2 className="text text_type_main-medium">Булки</h2>
          <Ingredients ingredients={filterIngredients(ingredients, "bun")} />
        </div>
        <div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <Ingredients ingredients={filterIngredients(ingredients, "sauce")} />
        </div>
        <div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <Ingredients ingredients={filterIngredients(ingredients, "main")} />
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
