import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { BASE_URL, checkReponse } from "../components/utils/burger-api";
import { useForm } from "../hooks/useForm";

import styles from "./page.module.css";

export function ForgotPassFirstPage() {
    const { isAuthorized, isLoading } = useSelector(state => state.auth)
    const history = useHistory();
    const location = useLocation();

    const { values, handleChange } = useForm({
        email: ""
    })

    useLayoutEffect(() => {
        if (isAuthorized && !isLoading) {
            history.replace(location?.state?.from || '/');
        }
    }, [history, isAuthorized, isLoading, location?.state?.from])

    const onSubmitForm = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/password-reset`, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify({
                email: values.email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkReponse)
            .then(data => {
                if (data.success) history.replace('/reset-password', { from: "/forgot-password" })
            })
            .catch(error => console.log("error", error))
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={onSubmitForm}>
                <label className={`text text_type_main-medium ${styles.label}`}>
                    Восстановление пароля
                </label>
                <div className={styles.inputs}>
                    <EmailInput onChange={handleChange} value={values.email} name={'email'} />
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
    )
}
