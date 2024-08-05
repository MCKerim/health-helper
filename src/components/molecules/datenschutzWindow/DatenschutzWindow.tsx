import React, { useState } from "react";
import ContentBox from "../../atoms/contentBox/ContentBox";
import "./DatenschutzWindow.css";
import ActionButton from "../../atoms/actionButton/ActionButton";
import Notification from "../../atoms/notification/Notification"; // Assuming Notification is saved here
import { auth, deleteAllChatsByUID } from "../../../firebase";
import { NavLink } from "react-router-dom";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";
import {useTranslation} from "react-i18next";

const DatenschutzWindow = () => {
  const [showNotification, setShowNotification] = useState(false);
  const {t} = useTranslation()
  const handleDeleteChats = async () => {
    try {
      await deleteAllChatsByUID(auth.currentUser?.uid);
      setShowNotification(true); // Show notification on successful deletion
    } catch (error) {
      console.error("Failed to delete chats:", error);
      // Optionally handle errors (e.g., show error notification)
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className={"DatenschutzContainer"}>
      <ContentBox>
        <p>{t(TranslationKeys.text_protection_notice)}</p>
      </ContentBox>

      <ContentBox>
        <p>
          <strong>{t(TranslationKeys.title_what_data_we_store)}</strong>
          <br />
          {t(TranslationKeys.text_data_storage)}
        </p>
        <ul>
          <li>
            <strong>{t(TranslationKeys.label_chats_headline)}</strong>{" "}
            <p>{t(TranslationKeys.label_chats)}</p>
          </li>
          <li>
            <strong>{t(TranslationKeys.label_account_info_headline)}</strong>{" "}
            <p>{t(TranslationKeys.label_account_info)}</p>
          </li>
        </ul>
      </ContentBox>

      <ContentBox>
        <p>
          <strong>{t(TranslationKeys.title_data_usage)}</strong>
          <br />
          {t(TranslationKeys.text_data_usage)}
        </p>
        <ul>
          <li>
            <strong>
              {t(TranslationKeys.label_service_provision_headline)}
            </strong>{" "}
            {t(TranslationKeys.label_service_provision)}
          </li>
          <li>
            <strong>
              {t(TranslationKeys.label_model_improvement_headline)}
            </strong>{" "}
            {t(TranslationKeys.label_model_improvement)}
          </li>
        </ul>
      </ContentBox>

      <ContentBox>
        <p>
          <strong>{t(TranslationKeys.text_data_deletion)}</strong>
          <br />
          {t(TranslationKeys.text_data_deletion)}
        </p>
      </ContentBox>

      <ContentBox>
        <p>
          <strong>{t(TranslationKeys.contact_info)}</strong>
          <br />
          {t(TranslationKeys.text_contact)}
          <a style={{}} href="mailto:aldo.costa@hhu.de">
            Aldo.Costa@hhu.de
          </a>
          {t(TranslationKeys.text_contact_continued)}
        </p>
      </ContentBox>

      {auth.currentUser ? (
        <ActionButton
          onClick={handleDeleteChats}
          label={t(TranslationKeys.button_delete_chats)}
        />
      ) : (
        <NavLink className={"ReturnButton"} to={"/"}>
          {t(TranslationKeys.button_return)}
        </NavLink>
      )}

      {showNotification && (
        <Notification
          message={t(TranslationKeys.notification_chats_deleted)}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default DatenschutzWindow;
