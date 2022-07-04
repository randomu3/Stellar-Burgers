import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import modalStyles from "./Modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";

import { ModalOverlay } from "../ModalOverlay/ModalOverlay";

export const Modal = ({ children, className, closeModal }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [closeModal]);

  function stopPropogationClick(e) {
    e.stopPropagation();
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay className={modalStyles.wrapper} closeModal={closeModal}>
        <div
          className={`${modalStyles.modal} ${className}`}
          onClick={stopPropogationClick}
        >
          <button className={modalStyles.button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};
