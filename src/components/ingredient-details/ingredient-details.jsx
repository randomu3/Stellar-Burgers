import React from "react";

import IDStyles from "./ingredient-details.module.css";

import { Modal } from "../Modal/modal";

import PropTypes from "prop-types";
import { ingredientPropType } from "../utils/ingredients-shape";

export const IngredientDetails = ({ data, closeModal }) => {
  return (
    <Modal className={IDStyles.modal} closeModal={closeModal}>
      <h3 className="text text_type_main-large">Детали ингредиента</h3>
      <div className={`${IDStyles.img_block}`}>
        <img className={IDStyles.img} src={data.image} alt={data.name} />
      </div>
      <p className={`mt-4 text text_type_main-medium ${IDStyles.description}`}>
        {data.name}
      </p>
      <div className={`mt-8 ${IDStyles.nutritional_value_block}`}>
        <div className={`${IDStyles.nutritional_value}`}>
          <p className={`text text_type_main-default ${IDStyles.nutrients}`}>
            Калории,ккал
          </p>
          <p className={`text text_type_digits-default  ${IDStyles.quantity}`}>
            {data.calories}
          </p>
        </div>
        <div className={`${IDStyles.nutritional_value}`}>
          <p className={`text text_type_main-default  ${IDStyles.nutrients}`}>
            Белки, г
          </p>
          <p className={`text text_type_digits-default  ${IDStyles.quantity}`}>
            {data.proteins}
          </p>
        </div>
        <div className={`${IDStyles.nutritional_value}`}>
          <p className={`text text_type_main-default  ${IDStyles.nutrients}`}>
            Жиры, г
          </p>
          <p className={`text text_type_digits-default  ${IDStyles.quantity}`}>
            {data.fat}
          </p>
        </div>
        <div className={`${IDStyles.nutritional_value}`}>
          <p className={`text text_type_main-default  ${IDStyles.nutrients}`}>
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default  ${IDStyles.quantity}`}>
            {data.carbohydrates}
          </p>
        </div>
      </div>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: ingredientPropType.isRequired,
};
