import React, { useState, useCallback, useMemo } from "react";

import bcStyles from "./burger-constructor.module.css";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { OrderDetails } from "../Order-details/order-details.jsx";
import { OrdersContext } from "../../services/ordersContext.js";

const ComponentsList = () => {
  const { orders } = React.useContext(OrdersContext);

  return (
    <div className={bcStyles.constructor_wrapper}>
      {orders.bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${orders.bun.name} (верх)`}
          price={orders.bun.price}
          thumbnail={orders.bun.image}
        />
      )}
      <ul className={`${bcStyles.ul}`}>
        {orders.othersProducts.map((ingredient) => (
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
      {orders.bun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${orders.bun.name} (низ)`}
          price={orders.bun.price}
          thumbnail={orders.bun.image}
        />
      )}
    </div>
  );
};

const ButtonOrder = () => {
  const [isShow, setShow] = useState(false);
  const { orders } = React.useContext(OrdersContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  function openModal() {
    setShow(true);
    setIsLoading(true);
    let idOrdersArray = orders.othersProducts.map(
      (ingredient) => ingredient._id
    );
    idOrdersArray.push(orders.bun._id, orders.bun._id);

    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: idOrdersArray,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data.order.number);
      })
      .catch((err) => console.log(err));
  }

  const closeModal = useCallback(() => {
    !isLoading && setShow(false);
  }, [isLoading]);

  const memoizedValue = useMemo(
    () =>
      orders.othersProducts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.price,
        orders.bun?.price * 2
      ),
    [orders] // То что влияет на изменение
  );

  return (
    <>
      {isShow && (
        <OrderDetails
          codeOrder={data}
          isLoading={isLoading}
          closeModal={closeModal}
        />
      )}
      <div className={`${bcStyles.button_section}`}>
        <div className={`${bcStyles.button}`}>
          <p className={`text text_type_digits-medium mr-2`}>
            {memoizedValue || 0}
          </p>
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
      <ComponentsList />
      <ButtonOrder />
    </div>
  );
};
