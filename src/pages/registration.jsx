import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../services/actions/auth";

import styles from "./page.module.css";

export function RegistrationPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthorized, isLoading } = useSelector(state => state.auth)

    useLayoutEffect(() => {
        if (isAuthorized && !isLoading) {
            history.replace("/")
        }
    }, [history, isAuthorized, isLoading])

    const onChangeInputs = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        dispatch(register(form))
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={onSubmitForm}>
                <label className={`text text_type_main-medium ${styles.label}`}>
                    Регистрация
                </label>
                <div className={styles.inputs}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChangeInputs}
                        value={form.name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <EmailInput onChange={onChangeInputs} value={form.email} name={'email'} />
                    <PasswordInput
                        onChange={onChangeInputs}
                        value={form.password}
                        name={"password"}
                    />
                </div>
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
                <div className={styles.text_under_the_form}>
                    {/* Исправить span на <Link></Link> */}
                    <label className={`text text_type_main-default ${styles.text}`}>
                        Уже зарегестрированы? <Link to="/forgot-password" className={styles.text_link}>Восстановить пароль</Link>
                    </label>
                </div>
            </form>
        </div>
    );
}
