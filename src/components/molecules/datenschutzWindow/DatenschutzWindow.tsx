import React, { useState } from "react";
import ContentBox from "../../atoms/contentBox/ContentBox";
import "./DatenschutzWindow.css";
import ActionButton from "../../atoms/actionButton/ActionButton";
import Notification from "../../atoms/notification/Notification"; // Assuming Notification is saved here
import { auth, deleteAllChatsByUID } from "../../../firebase";

const DatenschutzWindow = () => {
  const [showNotification, setShowNotification] = useState(false);

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
        <p>
          Deine Daten werden nicht von uns gespeichert. Wir benutzen Chat-GPT...
        </p>
      </ContentBox>

      <ContentBox>
        <p>Für Weitere Informationen...</p>
      </ContentBox>

      <ActionButton onClick={handleDeleteChats} label="Chats löschen" />

      {showNotification && (
        <Notification
          message="Alle Chats wurden erfolgreich gelöscht."
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default DatenschutzWindow;
