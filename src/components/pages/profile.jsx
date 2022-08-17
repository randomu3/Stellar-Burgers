import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./page.module.css";

export function ProfilePage() {
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
    return (
        <div className={styles.profile_wrapper}>
            <div className={styles.profile_links}>
                <nav>
                    {/* Доделать <NavLink></NavLink> */}
                    <NavLink to="/profile" activeClassName={styles.link_active} className={`text text_type_main-medium ${styles.link}`}>Профиль</NavLink>
                    <button className={`text text_type_main-medium ${styles.link}`}>История заказов</button>
                    <button className={`text text_type_main-medium ${styles.link}`}>Выход</button>
                </nav>
                <span className={`text text_type_main-default ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <form>
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
                <div className={styles.submit_form}>
                    <Button type="secondary" size="medium">
                        Отмена
                    </Button>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>

    )
}