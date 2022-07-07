import React from "react";

import ODStyles from "./order-details.module.css";

import { Modal } from "../modal/modal";

import PropTypes from "prop-types"; // ES6

export const OrderDetails = ({ closeModal }) => {
  return (
    <Modal className={`pt-30 pb-30 ${ODStyles.modal}`} closeModal={closeModal}>
      <p className={`text text_type_digits-large ${ODStyles.price}`}>034536</p>
      <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
      <img className="mt-15" src="./graphics.png" alt="Галочка" />
      <p className="mt-15 text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className={`mt-2 text text_type_main-default ${ODStyles.text}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>
  );
};

OrderDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
