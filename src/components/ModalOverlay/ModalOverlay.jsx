import React from "react";

import modalOverlayStyles from "./ModalOverlay.module.css";

export const ModalOverlay = ({ children }) => {
    return (
        <div className={modalOverlayStyles.wrapper}>
            {children}
        </div>
    )
}