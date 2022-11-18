import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { logout } from "../services/actions/auth";
import { data } from "../components/utils/data";
import { ru } from "date-fns/locale";
import styles from "./page.module.css";
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/wsActionTypes";
import { getCookie } from "../components/utils/cookie";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { wsUrl } from "../components/utils/constants";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { TOrder } from "../services/types/data";

export function OrdersFeed() {
  const dispatch = useAppDispatch();
  const onClickLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(logout());
  };
  const history = useHistory();
  let location = useLocation();

  const orders = useAppSelector((state) => state.ws.orders);

  useEffect(() => {
    dispatch({ type: WS_CLEAR_ORDERS });
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${wsUrl}?token=${getCookie("accessToken").split(" ")[1]}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile_links}>
        <nav>
          <NavLink
            to="/profile"
            exact
            activeClassName={styles.link_active}
            className={`text text_type_main-medium ${styles.link}`}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact
            activeClassName={styles.link_active}
            className={`text text_type_main-medium ${styles.link}`}
          >
            История заказов
          </NavLink>
          <Link
            to="/login"
            onClick={onClickLogout}
            className={`text text_type_main-medium ${styles.link}`}
          >
            Выход
          </Link>
        </nav>
        <span className={`text text_type_main-default ${styles.description}`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </span>
      </div>
      <div className={styles.feed}>
        <ul className={styles.orders_list}>
          {orders.reverse().map((order, index) => (
            <OrderItem
              order={order}
              key={order._id}
              onClick={() => {
                history.push({
                  pathname: `/profile/orders/${order._id}`,
                  state: { background: location },
                });
              }}
            ></OrderItem>
          ))}
        </ul>
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
