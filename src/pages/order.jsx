import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";
import { data } from "../components/utils/data";

import styles from "./page.module.css";

export function Order({ closeModal }) {
  const { id } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { orders } = useSelector((state) => state.ws);
  const order = orders.filter((order) => order._id === id)[0];

  console.log("id", id);
  console.log("order", order);
  console.log("ingredients", ingredients);

  const order_number = "0000";
  const name = "Black Hole Singularity острый бургер";
  const testDate = "Вчера, 13:50 i-GMT+3";
  const testPrice = 510;
  const testCounter = 2;

  return (
    <Modal className={styles.wrapper} closeModal={closeModal}>
      <span className={`${styles.order_number} text text_type_digits-default`}>
        #{order.number}
      </span>
      <div className={`${styles.information}`}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>
          {order.name}
        </h2>
        <span
          className={`${styles.status_success} text text_type_main-default`}
        >
          {"Выполнен"}
        </span>
        <span className={`${styles.structure} text text_type_main-medium`}>
          Состав:
        </span>
        <ul className={styles.items}>
          {order.ingredients.map((item, index) =>
            ingredients.filter(
              (ingredient) =>
                ingredient._id === item && (
                  <li key={index} className={styles.item}>
                    <div className={styles.item_li_n_img}>
                      <div className={styles.item_li}>
                        <img
                          className={styles.item_img}
                          src={ingredient.image_mobile}
                          alt={ingredient.name}
                        />
                      </div>
                    </div>
                    <span
                      className={`text text_type_main-default ${styles.item_title}`}
                    >
                      {item.name}
                    </span>
                    <div className={styles.quantity_n_price}>
                      <span
                        className={`text text_type_digits-default ${styles.item_price}`}
                      >
                        {testCounter} x {item.price}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                )
            )
          )}
        </ul>
      </div>
      <div className={styles.price_n_date}>
        <span
          className={`${styles.date_order} text text_type_main-default text_color_inactive`}
        >
          {testDate}
        </span>
        <div className={styles.price_n_currency}>
          <span
            className={`${styles.price_order} text text_type_digits-default`}
          >
            {testPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Modal>
  );
}
