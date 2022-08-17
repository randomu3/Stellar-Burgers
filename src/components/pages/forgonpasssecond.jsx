import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import { checkReponse } from "../utils/burger-api";
import { data } from "../utils/data";

import styles from "./page.module.css";

export function ForgotPassSecondPage() {
    const [value, setValue] = React.useState("")
    const inputRef = React.useRef(null)

    // PasswordInput
    const [valuePass, setValuePass] = React.useState("");
    const onChangePassword = (e) => {
        setValuePass(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault()
        fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
            method: "POST",
            body: JSON.stringify({
                password: valuePass,
                token: ""
            }),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(checkReponse)
            .then(data => console.log(data.message))
            .catch(error => console.log("error", error))
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={onSubmitForm}>
                <label className={`text text_type_main-medium ${styles.label}`}>
                    Восстановление пароля
                </label>
                <div className={styles.inputs}>
                    <PasswordInput
                        onChange={onChangePassword}
                        value={valuePass}
                        name={"password"}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
                <div className={styles.text_under_the_form}>
                    {/* Исправить span на <Link></Link> */}
                    <label className={`text text_type_main-default ${styles.text}`}>
                        Вспомнили пароль? <Link to="/login" className={styles.text_link}>Войти</Link>
                    </label>
                </div>
            </form>
        </div>
    );
}
