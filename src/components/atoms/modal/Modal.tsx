import React from "react";
import "./Modal.css";
type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  error?: string;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, error }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        {children}
        <button className={"modal-button cancel"} onClick={onClose}>
          Schließen
        </button>
        {error && <p className="modal-alert-box">{error}</p>}
      </div>
    </div>
  );
};

export default Modal;
