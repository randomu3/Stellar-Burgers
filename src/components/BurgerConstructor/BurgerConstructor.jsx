import React, { useState, useCallback } from "react";

import { data } from "../utils/data.js";

import bcStyles from "./BurgerConstructor.module.css";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types"; // ES6
import { OrderDetails } from "../OrderDetails/OrderDetails.jsx";

const ComponentsList = ({ ingredients }) => {
  return (
    <div className={bcStyles.constructor_wrapper}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={data[1].image}
      />
      <ul className={`${bcStyles.ul}`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className={bcStyles.li}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={data[1].image}
      />
    </div>
  );
};

ComponentsList.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

const ButtonOrder = () => {
  const [isShow, setShow] = useState(false);

  function openModal() {
    setShow(true);
  }

  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      {isShow && <OrderDetails closeModal={closeModal} />}
      <div className={`${bcStyles.button_section}`}>
        <div className={`${bcStyles.button}`}>
          <p className={`text text_type_digits-medium mr-2`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export const BurgerConstructor = () => {
  return (
    <div className={`${bcStyles.constructor} ml-4`}>
      <ComponentsList ingredients={data} />
      <ButtonOrder />
    </div>
  );
};
