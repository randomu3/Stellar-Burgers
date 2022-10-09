import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./page.module.css";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../services/actions/wsActionTypes";
import { wsUrl } from "../components/utils/constants";

export function FeedPage() {
  const { id } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { orders } = useSelector((state) => state.ws);
  const order = orders.find((order) => order._id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${wsUrl}/all`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  const countIngredients = useMemo(() => {
    if (!order) {
      return [];
    }
    const currentIngredients = order?.ingredients.map((id) =>
      ingredients.find((ingredient) => ingredient._id === id)
    );
    const obj = {};
    currentIngredients.forEach((el) => {
      const _id = el._id;
      if (_id in obj) {
        obj[_id].count++;
      } else {
        obj[_id] = el;
        obj[_id].count = 1;
      }
    });
    return Object.values(obj);
  }, [ingredients, order]);

  const memoizedPrice = useMemo(() => {
    return countIngredients.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.count;
    }, 0);
  }, [countIngredients]);

  if (!order) {
    return null;
  }

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
    <div className={styles.wrapperPage}>
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
          {countIngredients?.map((item, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.item_li_n_img}>
                <div className={styles.item_li}>
                  <img
                    className={styles.item_img}
                    src={item.image_mobile}
                    alt={item.name}
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
                  {item.count} x {item.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
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
    </div>
  );
}
