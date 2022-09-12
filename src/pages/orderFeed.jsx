import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { logout } from "../services/actions/auth";
import { data } from "../components/utils/data";

import styles from "./page.module.css";
import { setInfoIngredient } from "../services/actions/currentIngredient";
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_START,
} from "../services/actions/wsActionTypes";
import { getCookie } from "../components/utils/cookie";

export function OrdersFeed() {
  const dispatch = useDispatch();
  const onClickLogout = (e) => {
    e.preventDefault();
    dispatch(logout);
  }; // complete

  // example
  const orderNum = 12345;
  const orderDate = "Сегодня, 16:20 i-GMT+3";
  const orderName = "Death Star Starship Main бургер";
  const price = 480;
  const history = useHistory();
  let location = useLocation();
  const orders = useSelector((state) => state.ws.orders);

  useEffect(() => {
    dispatch({ type: WS_CLEAR_ORDERS });
    dispatch({
      type: WS_CONNECTION_START,
      payload: `wss://norma.nomoreparties.space/orders?token=${
        getCookie("accessToken").split(" ")[1]
      }`,
    });
  }, [dispatch]);

  function openModal(data) {
    dispatch(setInfoIngredient(data)); // ?? change dispatch
  }

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
          {data.map((order, index) => (
            <li
              key={index}
              className={styles.order}
              onClick={() => {
                openModal(order);
                history.push({
                  pathname: `/profile/orders/${order._id}`,
                  state: { background: location },
                });
              }}
            >
              <div className={styles.order_n_orderDate}>
                <span className="text text_type_digits-default">
                  #{orderNum}
                </span>
                <span className="text text_type_main-default text_color_inactive">
                  {orderDate}
                </span>
              </div>
              <h3 className="text text_type_main-medium">{orderName}</h3>
              <div className={styles.list_n_price}>
                <ul className={styles.list}>
                  {data.slice(0, 6).map((item, index) => (
                    <li key={index} className={styles.list_item}>
                      {index + 1 === 6 ? (
                        <img
                          style={{ opacity: 0.6 }}
                          className={styles.item_screen}
                          src={item.image_mobile}
                          alt={item.name}
                        />
                      ) : (
                        <img
                          className={styles.item_screen}
                          src={item.image_mobile}
                          alt={item.name}
                        />
                      )}
                      {index + 1 === 6 ? (
                        <span
                          className={`text text_type_main-default ${styles.quantity}`}
                        >
                          +{data.length - 6}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <div className={styles.price}>
                  <span className="text text_type_digits-default">{price}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
