import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { data } from "../components/utils/data";
import { setInfoIngredient } from "../services/actions/currentIngredient";
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_START,
} from "../services/actions/wsActionTypes";
import PropTypes from "prop-types";

import styles from "./page.module.css";

export function Feed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const orders = useSelector((state) => state.ws.orders);
  useEffect(() => {
    dispatch({ type: WS_CLEAR_ORDERS });
    dispatch({
      type: WS_CONNECTION_START,
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
  }, [dispatch]);

  function openModal(data) {
    dispatch(setInfoIngredient(data)); // ?? change dispatch
  }

  console.log("orders", orders);

  return (
    <div className={styles.feed_wrapper}>
      <h1 className={`text text_type_main-large`}>Лента заказов</h1>
      <div className={styles.feed_n_information}>
        <div className={styles.feed}>
          <ul className={`${styles.orders_list} ${styles.orders_list_indent}`}>
            {orders.map((order, index) => (
              <OrderItem
                key={index}
                order={order}
                onClick={() => {
                  openModal(order);
                  history.push({
                    pathname: `/feed/${order._id}`,
                    state: { background: location },
                  });
                }}
              />
            ))}
          </ul>
          <div className={styles.feed_information}></div>
        </div>
        <div className={styles.feed_orders_n_order_ready}>
          <div className={styles.feed_orders}>
            <div className={styles.feed_indent}>
              <h3 className={`text text_type_main-medium`}>Готовы:</h3>
              <ul className={styles.feed_list_orders}>
                {orders.map(
                  (order) =>
                    order.status === "done" && (
                      <li
                        key={order._id}
                        className={`${styles.feed_orders_ready} text text_type_digits-default`}
                      >
                        {String(order.number)}
                      </li>
                    )
                )}
              </ul>
            </div>
            <div className={styles.feed_indent}>
              <h3 className={`text text_type_main-medium`}>В работе:</h3>
              <ul className={styles.feed_list_orders}>
                {orders.map(
                  (order) =>
                    order.status === "pending" && (
                      <li className={`text text_type_digits-default`}>
                        {String(order.number)}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
          <div>
            <h2 className={`text text_type_main-medium`}>
              Выполнено за все время:
            </h2>
            <span className={`text text_type_digits-large`}>28 752</span>
          </div>
          <div>
            <h2 className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </h2>
            <span className={`text text_type_digits-large`}>138</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderItem({ order, onClick }) {
  const { ingredients } = useSelector((state) => state.ingredients);
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

  const sumPrice = React.useMemo(() => {
    return order.ingredients.reduce((previousValue, currentValue) => {
      const ingredient = ingredients.find((e) => e._id === currentValue);
      let sumPrice = previousValue + ingredient.price;
      if (ingredient.type === "bun") {
        sumPrice += ingredient.price;
      }
      return sumPrice;
    }, 0);
  }, [ingredients, order.ingredients]);

  return (
    <li className={styles.order} onClick={onClick}>
      <div className={styles.order_n_orderDate}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {stringOfDate}
        </span>
      </div>
      <h3 className="text text_type_main-medium">{order.name}</h3>
      <div className={styles.list_n_price}>
        <ul className={styles.list}>
          {data.length > 6 ? (
            <IngredientsMoreSix data={order.ingredients} />
          ) : (
            <IngredientsLessSix data={order.ingredients} />
          )}
        </ul>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{sumPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

function IngredientsMoreSix({ data }) {
  const { ingredients } = useSelector((state) => state.ingredients);
  return (
    <>
      {data.slice(0, 6).map((item, index) => (
        <li key={index} className={styles.list_item}>
          {index + 1 === 6 ? (
            <img
              style={{ opacity: 0.6 }}
              className={styles.item_screen}
              src={ingredients.find((e) => e._id === item).image_mobile}
              alt={ingredients.find((e) => e._id === item).name}
            />
          ) : (
            <img
              className={styles.item_screen}
              src={ingredients.find((e) => e._id === item).image_mobile}
              alt={ingredients.find((e) => e._id === item).name}
            />
          )}
          {index + 1 === 6 ? (
            <span className={`text text_type_main-default ${styles.quantity}`}>
              +{data.length - 5}
            </span>
          ) : null}
        </li>
      ))}
    </>
  );
}

function IngredientsLessSix({ data }) {
  const { ingredients } = useSelector((state) => state.ingredients);
  return (
    <>
      {data.map((item, index) => (
        <li key={index} className={styles.list_item}>
          <img
            style={{ opacity: 0.6 }}
            className={styles.item_screen}
            src={ingredients.find((e) => e._id === item).image_mobile}
            alt={ingredients.find((e) => e._id === item).name}
          />
        </li>
      ))}
    </>
  );
}

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
