import React from "react";

import PropTypes from "prop-types";

import modalOverlayStyles from "./modal-overlay.module.css";

export const ModalOverlay = ({ children, closeModal }) => {
  return (
    <div className={modalOverlayStyles.wrapper} onClick={closeModal}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};
