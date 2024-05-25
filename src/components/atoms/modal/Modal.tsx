import React from "react";
import "./Modal.css";

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
          Schließen
        </button>
        {error && <p className="modal-alert-box">{error}</p>}
      </div>
    </div>
  );
}
