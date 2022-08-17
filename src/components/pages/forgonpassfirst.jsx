import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import { checkReponse } from "../utils/burger-api";

import styles from "./page.module.css";

export function ForgotPassFirstPage() {
    // Input (E-mail)
    const [valueMail, setValueMail] = React.useState('')
    const onChangeMail = e => {
        setValueMail(e.target.value)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        fetch('https://norma.nomoreparties.space/api/password-reset', {
            method: 'POST', // или 'PUT'
            body: JSON.stringify({
                email: valueMail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkReponse)
            .then(data => console.log(data.message)) // Ревьюер, почему сервер даже на пустую строку выдает success
            .catch(error => console.log("error", error))
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={onSubmitForm}>
                <label className={`text text_type_main-medium ${styles.label}`}>
                    Восстановление пароля
                </label>
                <div className={styles.inputs}>
                    <EmailInput onChange={onChangeMail} value={valueMail} name={'email'} />
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
