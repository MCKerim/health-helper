import React from "react";
import "./Notification.css";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="notification fade-in-top">
      <p>{message}</p>
      <button className={"closeButton"} onClick={onClose}>
        Schließen
      </button>
    </div>
  );
};

export default Notification;
