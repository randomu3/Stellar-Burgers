import React, { ReactNode } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

export const ModalOverlay: React.FC<{
  children: ReactNode;
  closeModal: () => void;
}> = ({ children, closeModal }) => {
  return (
    <div className={modalOverlayStyles.wrapper} onClick={closeModal}>
      {children}
    </div>
  );
};
