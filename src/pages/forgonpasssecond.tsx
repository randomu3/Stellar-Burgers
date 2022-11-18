import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useLayoutEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { BASE_URL, checkReponse } from "../components/utils/burger-api";
import { useForm } from "../hooks/useForm";
import { ILocationState } from "../services/types/data";

import styles from "./page.module.css";

export function ForgotPassSecondPage() {
    const { values, handleChange } = useForm({
        password: "",
        token: ""
    })
    const inputRef = React.useRef(null)
    const history = useHistory();
    const location = useLocation<ILocationState>();
    useLayoutEffect(() => {
        if (location?.state?.from === "/forgot-password") {
            return undefined
        } else {
            history.replace("/")
        }
    }, [history, location?.state?.from])

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`${BASE_URL}/password-reset/reset/`, {
            method: "POST",
            body: JSON.stringify({
                password: values.password,
                token: values.token
            }),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(checkReponse)
            .then(data => { if (data.success) history.replace('/') })
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
                        onChange={handleChange}
                        value={values.password}
                        name={"password"}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.token}
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
