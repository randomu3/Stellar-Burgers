import React, { useCallback, useRef, useState } from "react";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientsStyles from "./burger-ingredients.module.css";

import PropTypes from "prop-types";
import { IngredientDetails } from "../Ingredient-details/ingredient-details.jsx";
import { filterIngredients } from "../utils/filter-ingredients";
import { ingredientPropType } from "../utils/ingredients-shape";
import { BurgerContext } from "../../services/burgerContext";

const Tabs = ({ mainsRef, bunsRef, saucesRef }) => {
  const [current, setCurrent] = React.useState("one");

  function handleButtonClick(ref) {
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <div className={ingredientsStyles.tab}>
      <Tab
        onClick={() => {
          handleButtonClick(bunsRef);
          setCurrent();
        }}
        value="one"
        active={current === "one"}
      >
        Булки
      </Tab>
      <Tab
        onClick={() => {
          handleButtonClick(saucesRef);
          setCurrent();
        }}
        value="two"
        active={current === "two"}
      >
        Соусы
      </Tab>
      <Tab
        onClick={() => {
          handleButtonClick(mainsRef);
          setCurrent();
        }}
        value="three"
        active={current === "three"}
      >
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

export const BurgerIngredients = () => {
  const { items } = React.useContext(BurgerContext);

  const mainsRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();

  return (
    <div className="mt-10">
      <h1 className="text mb-5 text_type_main-large">Соберите бургер</h1>
      <Tabs bunsRef={bunsRef} mainsRef={mainsRef} saucesRef={saucesRef} />
      <div className={`mt-10 ${ingredientsStyles.ingredients}`}>
        <div ref={bunsRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <Ingredients ingredients={filterIngredients(items, "bun")} />
        </div>
        <div ref={saucesRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <Ingredients ingredients={filterIngredients(items, "sauce")} />
        </div>
        <div ref={mainsRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <Ingredients ingredients={filterIngredients(items, "main")} />
        </div>
      </div>
    </div>
  );
};
