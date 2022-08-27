import React from "react";

import styles from "./page.module.css";

export function NotFound404() {
    return (
        <div className={`${styles.wrapper}`}>
            <h1 className="text text_type_main-large">Ошибка 404</h1>
            <p className="text text_type_main-medium">Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке.</p>
        </div>
    )
}