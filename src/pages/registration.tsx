import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { register } from "../services/actions/auth";

import styles from "./page.module.css";

export function RegistrationPage() {
    const { values, handleChange } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useAppDispatch();
    const history = useHistory();
    const { isAuthorized, isLoading } = useAppSelector(state => state.auth)

    useLayoutEffect(() => {
        if (isAuthorized && !isLoading) {
            history.replace("/")
        }
    }, [history, isAuthorized, isLoading])
    
    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(values))
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
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <EmailInput onChange={handleChange} value={values.email} name={'email'} />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
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
