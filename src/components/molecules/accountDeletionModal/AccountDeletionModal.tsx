import React, { useState } from "react";
import Modal from "../../atoms/modal/Modal";
import "../../atoms/modal/Modal.css";
import { removeUserAccount } from "../../../firebase";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";
import { t } from "i18next";

type AccountDeletionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AccountDeletionModal({
  isOpen,
  onClose,
}: Readonly<AccountDeletionModalProps>) {
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
      <h1>{t(TranslationKeys.confirm_account_deletion)}</h1>
      <p>{t(TranslationKeys.confirm_account_deletion_prompt)}</p>
      <button className="modal-button" onClick={handleDeleteAccount}>
        {t(TranslationKeys.button_confirm)}
      </button>
    </Modal>
  );
}
