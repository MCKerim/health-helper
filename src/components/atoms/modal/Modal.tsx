import React from "react";
import "./Modal.css";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";
import { t } from "i18next";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  error?: string;
};

export default function Modal({
  children,
  isOpen,
  onClose,
  error,
}: Readonly<Props>) {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        {children}
        <button className={"modal-button cancel"} onClick={onClose}>
          {t(TranslationKeys.button_close)}
        </button>
        {error && <p className="modal-alert-box">{error}</p>}
      </div>
    </div>
  );
}
