import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { login } from "../services/actions/auth";

import styles from "./page.module.css";

export function SignInPage() {
  const { isAuthorized } = useSelector(state => state.auth)
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const location = useLocation();

  const dispatch = useDispatch();
  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(login(values));
  }
  const history = useHistory();
  useEffect(() => {
    if (isAuthorized) {
      history.replace(location?.state?.from || '/');
    }
  }, [history, isAuthorized, location?.state?.from])

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <label className={`text text_type_main-medium ${styles.label}`}>
          Вход
        </label>
        <div className={styles.inputs}>
          <EmailInput value={values.email} onChange={handleChange} name={"email"} />
          <PasswordInput
            value={values.password}
            onChange={handleChange}
            name={"password"}
          />
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
        <div className={styles.text_under_the_form}>
          {/* Исправить span на <Link></Link> */}
          <label className={`text text_type_main-default ${styles.text}`}>
            Вы — новый пользователь? <Link to="/register" className={styles.text_link}>Зарегистрироваться</Link>
          </label>
          <label className={`text text_type_main-default ${styles.text}`}>
            Забыли пароль? <Link to="/forgot-password" className={styles.text_link}>Восстановить пароль</Link>
          </label>
        </div>
      </form>
    </div>
  );
}
