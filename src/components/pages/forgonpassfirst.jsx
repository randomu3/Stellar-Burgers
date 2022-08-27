import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL, checkReponse } from "../utils/burger-api";

import styles from "./page.module.css";

export function ForgotPassFirstPage() {
    const { isAuthorized, isLoading } = useSelector(state => state.auth)
    const history = useHistory();
    const [valueMail, setValueMail] = React.useState('')
    const onChangeMail = e => {
        setValueMail(e.target.value)
    }
    console.log(isAuthorized)
    useLayoutEffect(() => {
        if (isAuthorized && !isLoading) {
            history.replace("/")
        }
    }, [history, isAuthorized, isLoading])

    const onSubmitForm = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/password-reset`, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify({
                email: valueMail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkReponse)
            .then(data => {
                if (data.success) history.replace('/reset-password') // Ревьюер, почему сервер даже на пустую строку выдает success
            })
            .catch(error => console.log("error", error))
    }

    return (
        <>
            {isAuthorized && !isLoading ? null : (<div className={styles.loginWrapper}>
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
            )}
        </>
    );
}
