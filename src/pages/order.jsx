import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "../components/utils/data";

import styles from "./page.module.css";

export function Order() {

    const order_number = "034533";
    const name = "Black Hole Singularity острый бургер";
    const testDate = "Вчера, 13:50 i-GMT+3";
    const testPrice = 510;
    const testCounter = 2;

    return (
        <div className={styles.wrapper}>
            <span className={`${styles.order_number} text text_type_digits-default`}>#{order_number}</span>
            <div className={`${styles.information}`}>
                <h2 className={`${styles.heading} text text_type_main-medium`}>{name}</h2>
                <span className={`${styles.structure} text text_type_main-medium`}>Состав:</span>
                <ul className={styles.items}>
                    {data.map((item) => (
                        <li className={styles.item}>
                            <div className={styles.item_li_n_img}>
                                <div className={styles.item_li}>
                                    <img className={styles.item_img} src={item.image_mobile} alt={item.name} />
                                </div>
                            </div>
                            <span className={`text text_type_main-default ${styles.item_title}`}>{item.name}</span>
                            <div className={styles.quantity_n_price}>
                                <span className={`text text_type_digits-default ${styles.item_price}`}>{testCounter} x {item.price}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    )
                    )}

                </ul>
            </div>
            <div className={styles.price_n_date}>
                <span className={`${styles.date_order} text text_type_main-default text_color_inactive`}>{testDate}</span>
                <div className={styles.price_n_currency}>
                    <span className={`${styles.price_order} text text_type_digits-default`}>{testPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}