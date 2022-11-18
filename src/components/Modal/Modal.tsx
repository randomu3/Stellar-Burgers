import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../Modal-overlay/modal-overlay";

export const Modal: React.FC<{
  children: ReactNode;
  className: string;
  closeModal: () => void;
}> = ({ children, className, closeModal }) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [closeModal]);

  function stopPropogationClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.stopPropagation();
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal}>
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
    document.getElementById("modal-root")!
  );
};
