import React from "react";

import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function IngredientInformation() {
    const { id } = useParams();
    const { ingredientsRequest, ingredientsFailed } = useSelector(
        (state) => state.ingredients
    );
    const data = useSelector((state) => state.ingredients.ingredients?.find(ingredient => ingredient._id === id));

    if (ingredientsFailed) {
        return <p>Не удалось загрузить страницу. Произошла непредвиденная ошибка.</p>;
    }

    if (ingredientsRequest) {
        return <p>...</p>;
    }

    return (
        <div className={styles.wrapperPage}>
            <div className={styles.ingredient_information}>
                <div className={styles.ingredient_name_n_photo}>
                    <h1 className={`text text_type_main-large`}>Детали ингредиента</h1>
                    <img src={data?.image_large} alt={data?.name} />
                </div>
                <div className={styles.ingredient_name_n_currency_calories}>
                    <span className="text text_type_main-medium">{data?.name}</span>
                    <div className={styles.ingredient_currency_calories}>
                        <div className={styles.ingredient_currency}>
                            <h3 className="text text_type_main-default text_color_inactive">Калории,ккал</h3>
                            <span className="text text_type_main-default text_color_inactive">{data?.calories}</span>
                        </div>
                        <div className={styles.ingredient_currency}>
                            <h3 className="text text_type_main-default text_color_inactive">Белки, г</h3>
                            <span className="text text_type_main-default text_color_inactive">{data?.proteins}</span>
                        </div>
                        <div className={styles.ingredient_currency}>
                            <h3 className="text text_type_main-default text_color_inactive">Жиры, г</h3>
                            <span className="text text_type_main-default text_color_inactive">{data?.fat}</span>
                        </div>
                        <div className={styles.ingredient_currency}>
                            <h3 className="text text_type_main-default text_color_inactive">Углеводы, г</h3>
                            <span className="text text_type_main-default text_color_inactive">{data?.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}