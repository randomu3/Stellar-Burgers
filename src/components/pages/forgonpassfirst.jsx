import {
    Button,
    EmailInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./page.module.css";

export function ForgotPassFirstPage() {
    // Input (E-mail)
    const [valueMail, setValueMail] = React.useState('')
    const onChangeMail = e => {
        setValueMail(e.target.value)
    }
    
    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form}>
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
