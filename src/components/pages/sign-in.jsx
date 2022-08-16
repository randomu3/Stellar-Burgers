import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import styles from "./page.module.css";

export function SignInPage() {
  // EmailInput
  const [valueEmail, setValueEmail] = React.useState('bob@example.com')
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  // PasswordInput
  const [valuePass, setValuePass] = React.useState("password");
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
          <EmailInput onChange={onChangeEmail} value={valueEmail} name={'email'} />
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
            Вы — новый пользователь? <span className={styles.text_link}>Зарегистрироваться</span>
          </label>
          <label className={`text text_type_main-default ${styles.text}`}>
            Забыли пароль? <span className={styles.text_link}>Восстановить пароль</span>
          </label>
        </div>
      </form>
    </div>
  );
}
