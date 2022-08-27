import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "./../utils/data"

import styles from "./page.module.css";

export function Feed() {

    const order = 12345
    const orderDate = "Сегодня, 16:20 i-GMT+3"
    const orderName = "Death Star Starship Main бургер"
    const price = 480
    return (
        <div className={styles.feed_wrapper}>
            <h1 className={`text text_type_main-large`}>Лента заказов</h1>
            <div className={styles.feed_n_information}>
                <div className={styles.feed}>
                    <ul className={`${styles.orders_list} ${styles.orders_list_indent}`}>
                        {/* map */}
                        <li className={styles.order}>
                            <div className={styles.order_n_orderDate}>
                                <span className="text text_type_digits-default">#{order}</span>
                                <span className="text text_type_main-default text_color_inactive">{orderDate}</span>
                            </div>
                            <h3 className="text text_type_main-medium">
                                {orderName}
                            </h3>
                            <div className={styles.list_n_price}>
                                <ul className={styles.list}>
                                    {data.slice(0, 6).map((item, index) => (
                                        <li className={styles.list_item}>
                                            {
                                                index + 1 === 6 ?
                                                    (
                                                        <img style={{ opacity: 0.6 }} className={styles.item_screen} src={item.image_mobile} alt={item.name} />
                                                    )
                                                    :
                                                    (
                                                        <img className={styles.item_screen} src={item.image_mobile} alt={item.name} />
                                                    )
                                            }
                                            {
                                                index + 1 === 6 ?
                                                    (
                                                        <span className={`text text_type_main-default ${styles.quantity}`}>+{data.length - 6}</span>
                                                    )
                                                    :
                                                    null
                                            }
                                        </li>
                                    )
                                    )}
                                </ul>
                                <div className={styles.price}>
                                    <span className="text text_type_digits-default">{price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.feed_information}></div>
                </div>
                <div className={styles.feed_orders_n_order_ready}>
                    <div className={styles.feed_orders}>
                        <div className={styles.feed_indent}>
                            <h3 className={`text text_type_main-medium`}>Готовы:</h3>
                    {/* map  */}
                    <ul className={styles.feed_list_orders}>
                        <li className={`${styles.feed_orders_ready} text text_type_digits-default`}>034527</li>
                        <li className={`${styles.feed_orders_ready} text text_type_digits-default`}>034527</li>
                        <li className={`${styles.feed_orders_ready} text text_type_digits-default`}>034527</li>
                        <li className={`${styles.feed_orders_ready} text text_type_digits-default`}>034527</li>
                        <li className={`${styles.feed_orders_ready} text text_type_digits-default`}>034527</li>
                    </ul>
                </div>
                <div className={styles.feed_indent}>
                    <h3 className={`text text_type_main-medium`}>В работе:</h3>
                    {/* map  */}
                    <ul className={styles.feed_list_orders}>
                        <li className={`text text_type_digits-default`}>034527</li>
                        <li className={`text text_type_digits-default`}>034527</li>
                        <li className={`text text_type_digits-default`}>034527</li>
                    </ul>
                </div>
            </div>
            <div>
                <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                <span className={`text text_type_digits-large`}>28 752</span>
            </div>
            <div>
                <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                <span className={`text text_type_digits-large`}>138</span>
            </div>
        </div>
            </div >
        </div >
    )
}