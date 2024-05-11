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
      <div className={""} onClick={onClose}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className={"closeButton"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentcolor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="m14.5 9.5-5 5m0-5 5 5" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Notification;
