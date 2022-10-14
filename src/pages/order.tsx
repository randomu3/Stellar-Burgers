import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./page.module.css";
import { useAppSelector } from "../hooks/useRedux";
import { TItem } from "../services/types/data";

export const Order: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { orders } = useAppSelector((state) => state.ws);
  const order = orders.filter((order) => order._id === id)[0];

  const countIngredients = useMemo(() => {
    const currentIngredients = order.ingredients.map((id) =>
      ingredients.find((ingredient) => ingredient._id === id)
    );
    const obj = {} as {
      [key: string]: TItem & { count?: number };
    };
    currentIngredients.forEach((el) => {
      if (!el) return null;
      const _id = el._id;
      if (_id in obj) {
        let count = obj[_id].count;
        if (count) count++;
        obj[_id].count = count;
      } else {
        obj[_id] = el;
        obj[_id].count = 1;
      }
    });
    return Object.values(obj);
  }, [ingredients, order.ingredients]);

  const memoizedPrice = useMemo(() => {
    return countIngredients.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * (currentValue.count || 1);
    }, 0);
  }, [countIngredients]);

  let stringOfDate = "";

  if (isToday(Date.parse(order.createdAt))) {
    stringOfDate = "Сегодня, ";
  } else if (isYesterday(Date.parse(order.createdAt))) {
    stringOfDate = "Вчера, ";
  } else {
    stringOfDate =
      formatDistanceToNow(Date.parse(order.createdAt), {
        locale: ru,
      }) + " назад, ";
  }

  stringOfDate += format(Date.parse(order.createdAt), "HH:mm zzz");

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
          {countIngredients.map((ingredient, index) => {
            return (
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
                  {ingredient.name}
                </span>
                <div className={styles.quantity_n_price}>
                  <span
                    className={`text text_type_digits-default ${styles.item_price}`}
                  >
                    {ingredient.count} x {ingredient.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.price_n_date}>
        <span
          className={`${styles.date_order} text text_type_main-default text_color_inactive`}
        >
          {stringOfDate}
        </span>
        <div className={styles.price_n_currency}>
          <span
            className={`${styles.price_order} text text_type_digits-default`}
          >
            {memoizedPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Modal>
  );
};
