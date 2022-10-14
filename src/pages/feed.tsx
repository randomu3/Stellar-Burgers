import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { data } from "../components/utils/data";
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/wsActionTypes";
import styles from "./page.module.css";
import { wsUrl } from "../components/utils/constants";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { TOrder } from "../services/types/data";

export function Feed() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const orders = useAppSelector((state) => state.ws.orders);
  const totalOrders = useAppSelector((state) => state.ws.total);
  const totalToday = useAppSelector((state) => state.ws.totalToday);

  useEffect(() => {
    dispatch({ type: WS_CLEAR_ORDERS });
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

  return (
    <div className={styles.feed_wrapper}>
      <h1 className={`text text_type_main-large`}>Лента заказов</h1>
      <div className={styles.feed_n_information}>
        <div className={styles.feed}>
          <ul className={`${styles.orders_list} ${styles.orders_list_indent}`}>
            {orders.map((order, index) => (
              <OrderItem
                key={order._id}
                order={order}
                onClick={() => {
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
            <span className={`text text_type_digits-large`}>{totalOrders}</span>
          </div>
          <div>
            <h2 className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </h2>
            <span className={`text text_type_digits-large`}>{totalToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const OrderItem: React.FC<{
  order: TOrder;
  onClick: () => void;
}> = ({ order, onClick }) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
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
      let sumPrice = previousValue + (ingredient?.price || 0);
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
};

const IngredientsMoreSix: React.FC<{ data: Array<string> }> = ({ data }) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  return (
    <>
      {data.slice(0, 6).map((item, index) => (
        <li key={index} className={styles.list_item}>
          {index + 1 === 6 ? (
            <img
              style={{ opacity: 0.6 }}
              className={styles.item_screen}
              src={ingredients.find((e) => e._id === item)?.image_mobile}
              alt={ingredients.find((e) => e._id === item)?.name}
            />
          ) : (
            <img
              className={styles.item_screen}
              src={ingredients.find((e) => e._id === item)?.image_mobile}
              alt={ingredients.find((e) => e._id === item)?.name}
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
};

const IngredientsLessSix: React.FC<{ data: Array<string> }> = ({ data }) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  return (
    <>
      {data.map((item, index) => (
        <li key={index} className={styles.list_item}>
          <img
            style={{ opacity: 0.6 }}
            className={styles.item_screen}
            src={ingredients.find((e) => e._id === item)?.image_mobile}
            alt={ingredients.find((e) => e._id === item)?.name}
          />
        </li>
      ))}
    </>
  );
};
