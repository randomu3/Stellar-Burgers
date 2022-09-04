import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import headerStyles from "./header.module.css";

const PersonalAccount = () => {
  const { pathname } = useLocation();
  return (
    <NavLink
      exact
      to={{ pathname: "/profile/", state: { from: "/profile/" } }}
      className={`pt-4 pb-4 pr-5 pl-5 text text_type_main-default text_color_inactive ${headerStyles.button}`}
      activeClassName={headerStyles.button_active}
    >
      <div className={`mr-2 ${headerStyles.personal_account_icon}`}>
        <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
      </div>
      Личный кабинет
    </NavLink>
  );
};

const ButtonConstructor = () => {
  const { pathname } = useLocation();
  return (
    <NavLink
      exact
      to="/"
      className={`pt-4 pb-4 pr-5 pl-5 text text_type_main-default text_color_inactive ${headerStyles.button}`}
      activeClassName={headerStyles.button_active}
    >
      <div className={`mr-2 ${headerStyles.constructor}`}>
        <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
      </div>
      Конструктор
    </NavLink>
  );
};

const ListOrders = () => {
  const { pathname } = useLocation();
  return (
    <NavLink
      exact
      to={{ pathname: "/feed/", state: { from: "/feed/" } }}
      className={`ml-2 pt-4 pb-4 pr-5 pl-5 text text_type_main-default text_color_inactive ${headerStyles.button} ${headerStyles.list}`}
      activeClassName={headerStyles.button_active}
    >
      <div className={`mr-2 ${headerStyles.list_orders}`}>
        <ListIcon type={pathname === '/profile/orders' ? "primary" : "secondary"} />
      </div>
      Лента заказов
    </NavLink>
  );
};

export const AppHeader = () => {
  return (
    <header className={headerStyles.header_semantic}>
      <div className={`p-4 ${headerStyles.header}`}>
        <div className={headerStyles.header_left_bar}>
          <ButtonConstructor />
          <ListOrders />
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <PersonalAccount />
      </div>
    </header>
  );
};
