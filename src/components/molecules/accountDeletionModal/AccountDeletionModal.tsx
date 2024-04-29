import React, { useState } from "react";
import Modal from "../../atoms/modal/Modal";
import "../../atoms/modal/Modal.css";
import { removeUserAccount } from "../../../firebase";

type AccountDeletionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccountDeletionModal: React.FC<AccountDeletionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    try {
      console.log("Deleting account...");
      await removeUserAccount();
      onClose(); // Close modal on successful deletion
    } catch (error: any) {
      if (error.message === "Recent login required") {
        setError("You need to log in again to delete your account.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} error={error} onClose={onClose}>
      <h1>Bestätige die Account Löschung</h1>
      <p>
        Bist du dir sicher dass du deinen Account unwiderruflich löschen willst?
      </p>
      <button className="modal-button" onClick={handleDeleteAccount}>
        Bestätigen
      </button>
    </Modal>
  );
};

export default AccountDeletionModal;
