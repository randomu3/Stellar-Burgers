import React from "react";

import ODStyles from "./order-details.module.css";

import PropTypes from "prop-types"; // ES6
import { Modal } from "../Modal/Modal";
import { useSelector } from "react-redux";

export const OrderDetails = ({ closeModal, isLoading }) => {
  const codeOrder = useSelector((state) => state.postOrder.data);
  const codeOrderFailed = useSelector((state) => state.postOrder.dataFailed);
  return (
    <Modal className={`pt-30 pb-30 ${ODStyles.modal}`} closeModal={closeModal}>
      {codeOrderFailed && (
        <p className={`text text_type_main-default ${ODStyles.text}`}>Произошла непредвиденная ошибка.</p>
      )}
      {isLoading && !codeOrderFailed && (
        <p className={`text text_type_main-default ${ODStyles.text}`}>
          Загрузка...
        </p>
      )}
      {!isLoading && !codeOrderFailed && (
        <>
          <p className={`text text_type_digits-large ${ODStyles.price}`}>
            {codeOrder}
          </p>
          <p className="mt-8 text text_type_main-medium">
            идентификатор заказа
          </p>
          <img className="mt-15" src="./graphics.png" alt="Галочка" />
          <p className="mt-15 text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className={`mt-2 text text_type_main-default ${ODStyles.text}`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </Modal>
  );
};

OrderDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
