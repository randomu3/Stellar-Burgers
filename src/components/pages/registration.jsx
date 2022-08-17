import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import { checkReponse } from "../utils/burger-api";

import styles from "./page.module.css";

export function RegistrationPage() {
    // Input (Name)
    const [valueName, setValueName] = React.useState('')
    const inputRefName = React.useRef(null)

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

    const onSubmitForm = (e) => {
        e.preventDefault()
        fetch('https://norma.nomoreparties.space/api/auth/register', {
            method: "POST",
            body: JSON.stringify({
                email: valueMail,
                password: valuePass,
                name: valueName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(checkReponse)
            .then((data) => console.log(data))
            .catch(error => console.log("error", error))
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
                        onChange={e => setValueName(e.target.value)}
                        value={valueName}
                        name={'name'}
                        error={false}
                        ref={inputRefName}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <EmailInput onChange={onChangeMail} value={valueMail} name={'email'} />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={valuePass}
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
