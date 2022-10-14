import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUser, logout, patchUser } from "../services/actions/auth";

import useInputState from "../hooks/useInputState";

import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

export function ProfilePage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const [password, onPasswordChange, setPass] = useInputState("");
  const [email, onMailChange, setMail] = useInputState("");
  const [name, onNameChange, setName] = useInputState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.email) setMail(user.email);
    if (user?.name) setName(user.name);
  }, [setMail, setName, user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      patchUser({
        name: name,
        email: email,
        password: password,
      })
    );
  }; // in development

  const onClickLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    dispatch(logout());
  }; // complete

  const onClickCancel = (e: React.SyntheticEvent<Element, Event>) => {
    setMail("");
    setName("");
    setPass("");
  };

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
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      {isLoading ? (
        <p>...</p>
      ) : (
        <form onSubmit={onSubmitForm}>
          <div className={styles.inputs}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onNameChange}
              value={name}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <EmailInput name={"email"} onChange={onMailChange} value={email} />
            <PasswordInput
              name={"password"}
              onChange={onPasswordChange}
              value={password}
            />
          </div>
          <div className={styles.submit_form}>
            <Button onClick={onClickCancel} type="secondary" size="medium">
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
