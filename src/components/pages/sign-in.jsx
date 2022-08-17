import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./page.module.css";

export function SignInPage() {
  // Input (E-mail)
  const [valueMail, setValueMail] = React.useState('')
  const onChangeMail = e => {
    setValueMail(e.target.value)
  }
  
  // PasswordInput
  const [valuePass, setValuePass] = React.useState("");
  const onChangePassword = (e) => {
    setValuePass(e.target.value);
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form}>
        <label className={`text text_type_main-medium ${styles.label}`}>
          Вход
        </label>
        <div className={styles.inputs}>
          <EmailInput onChange={onChangeMail} value={valueMail} name={'email'} />
          <PasswordInput
            onChange={onChangePassword}
            value={valuePass}
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
            Забыли пароль? <Link to="/forgot-password-1" className={styles.text_link}>Восстановить пароль</Link>
          </label>
        </div>
      </form>
    </div>
  );
}
