import "./DrawerMenuContent.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { auth, removeChat } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";
import Notification from "../notification/Notification";
import { useChats } from "../../contexts/chatContext/ChatContext";

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export default function DrawerMenuContent({
  isOpen,
  toggleDrawer,
}: Readonly<Props>) {
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { chats, updateChats } = useChats();

  useEffect(() => {
    updateChats();
  }, []);

  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  const handleRemoveChat = (chatId: string) => {
    removeChat(chatId)
      .then(() => {
        if (location.pathname.includes(`/chat/${chatId}`)) {
          navigate("/");
        }
        updateChats();
        setShowNotification(true);
        setNotificationMessage("Chat erfolgreich gelöscht.");
        if (chats.length === 1) {
          setIsChatListOpen(false);
        }
      })
      .catch((error) => {
        setShowNotification(true);
        setNotificationMessage("Fehler beim Löschen des Chats.");
        console.error("Error removing chat:", error);
      });
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const drawerSwipeTrigger = useSwipeable({
    onSwipedRight: () => isOpen && toggleDrawer(), // Only close if open
    trackMouse: true,
    delta: 10, // How far the swipe needs to move to be recognized
  });

  return (
    <>
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 3,
          cursor: "pointer",
        }}
        onClick={toggleDrawer}
      />
      <div
        {...drawerSwipeTrigger}
        className={`drawer ${isOpen ? "isOpen" : "isClosed"}`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
            gap: "20px",
          }}
        >
          <NavLink to={"/"} className="newChatButton" onClick={toggleDrawer}>
            Neuer Chat
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#000000"
            >
              <path d="M307.44-619.74h265.12q10.68 0 17.91-7.27 7.22-7.26 7.22-18 0-10.73-7.22-17.86-7.23-7.13-17.91-7.13H307.44q-10.68 0-17.91 7.26-7.22 7.27-7.22 18 0 10.74 7.22 17.87 7.23 7.13 17.91 7.13Zm0 164.87h145.12q10.68 0 17.91-7.27 7.22-7.26 7.22-17.99 0-10.74-7.22-17.87-7.23-7.13-17.91-7.13H307.44q-10.68 0-17.91 7.27-7.22 7.26-7.22 17.99 0 10.74 7.22 17.87 7.23 7.13 17.91 7.13Zm387.43 160H600q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h94.87V-440q0-10.68 7.27-17.9 7.26-7.23 17.99-7.23 10.74 0 17.87 7.23 7.13 7.22 7.13 17.9v94.87H840q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13h-94.87V-200q0 10.68-7.27 17.9-7.26 7.23-17.99 7.23-10.74 0-17.87-7.23-7.13-7.22-7.13-17.9v-94.87ZM235.77-290 157-211.23q-7.23 7.23-17.11 3.55-9.89-3.68-9.89-13.99v-545.77q0-25.6 18.48-44.08Q166.96-830 192.56-830h494.88q25.6 0 44.08 18.48Q750-793.04 750-767.44v186.75q0 9.07-6.55 15.4-6.54 6.32-15.99 5.7-51.31-1.54-95.46 15.11-44.15 16.64-82.05 54.43-37.85 37.9-54.13 82.05t-15.41 95.46q.62 9.45-5.84 15.99-6.46 6.55-15.26 6.55H235.77Z" />
            </svg>
          </NavLink>

          <div className={`listStart ${isChatListOpen ? "open" : ""}`}>
            <div
              onClick={toggleChatList}
              style={{
                borderBottom: "1px solid lightgray",
                textAlign: "start",
                paddingLeft: "15px",
                fontWeight: "bold",
                position: "sticky",
                top: "0",
                backgroundColor: "white",
              }}
            >
              Chat Verlauf
              <div className="ArrowLeft" />
              <div className="ArrowRight" />
            </div>

            <div className={`menuList ${isChatListOpen ? "open" : ""}`}>
              {chats.map((chat, index) => (
                <NavLink
                  key={chat.id}
                  className="chatButton"
                  to={`/chats/${chat.id}`}
                  onClick={toggleDrawer}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {chat.data.title || chat.data.title === "New Chat"
                    ? chat.data.title
                    : `Chat ${index + 1}`}
                  <div className="trashCanIcon">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleRemoveChat(chat.id);
                      }}
                    />
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "2.5px",
            marginBottom: "15px",
            borderTop: "1px solid lightgray",
            paddingTop: "5px",
            position: "fixed",
            bottom: "0",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Link
            to={"https://forms.gle/XmqCoBxea51XhVnq8"}
            className={"menuLink"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 52 52"
              width={32}
              height={26}
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="none"
                height="4.8"
                rx="1.6"
                width="27.2"
                x="12.4"
                y="26"
              />
              <rect
                fill="none"
                height="4.8"
                rx="1.6"
                width="24"
                x="12.4"
                y="35.6"
              />
              <path d="M36.4 14.8h8.48A1.09 1.09 0 0 0 46 13.68a1 1 0 0 0-.32-.8L35.12 2.32a1 1 0 0 0-.8-.32 1.09 1.09 0 0 0-1.12 1.12v8.48a3.21 3.21 0 0 0 3.2 3.2z" />
              <path d="M44.4 19.6H33.2a4.81 4.81 0 0 1-4.8-4.8V3.6A1.6 1.6 0 0 0 26.8 2h-16A4.81 4.81 0 0 0 6 6.8v38.4a4.81 4.81 0 0 0 4.8 4.8h30.4a4.81 4.81 0 0 0 4.8-4.8v-24a1.6 1.6 0 0 0-1.6-1.6zm-32-1.6a1.62 1.62 0 0 1 1.6-1.55h6.55A1.56 1.56 0 0 1 22.12 18v1.59a1.63 1.63 0 0 1-1.59 1.58H14a1.55 1.55 0 0 1-1.58-1.58zm24 20.77a1.6 1.6 0 0 1-1.6 1.6H14a1.6 1.6 0 0 1-1.6-1.6V37.2a1.6 1.6 0 0 1 1.6-1.6h20.8a1.6 1.6 0 0 1 1.6 1.6zm3.2-9.6A1.6 1.6 0 0 1 38 30.8H14a1.6 1.6 0 0 1-1.6-1.6v-1.6A1.6 1.6 0 0 1 14 26h24a1.6 1.6 0 0 1 1.6 1.6z" />
            </svg>
            Umfrage
          </Link>
          <NavLink to={"/Datenschutz"} className="menuLink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#000000"
            >
              <path d="M686.48-100q-72.49 0-123.33-51.05t-50.84-122.59q0-72.44 50.84-123.58t123.33-51.14q71.83 0 122.88 51.14t51.05 123.58q0 71.54-51.05 122.59T686.48-100ZM180-519.08v-183.84q0-19.73 11.47-35.83 11.46-16.11 29.17-23.38l237.44-88.38q11.36-4.21 21.92-4.21 10.56 0 21.92 4.21l237.44 88.38q17.71 7.27 29.17 23.38Q780-722.65 780-702.92v165.41q0 13.97-11.18 22.34-11.18 8.38-24.87 4.27-13.75-3.59-28.49-5.65-14.74-2.06-29.22-2.06-101.54 0-172.87 71.69-71.32 71.69-71.32 173.28 0 32.08 9.39 64.4 9.38 32.32 27.89 62.32 8.65 14.48-1 27.38-9.64 12.9-24.79 7.36-57.05-20.15-101.87-51.56-44.82-31.41-86.05-88.62-40.31-56.36-62.96-124.27Q180-444.54 180-519.08Zm505.28 243.95q25.56 0 43.32-18.29t17.76-43.65q0-25.37-17.83-43.2-17.84-17.83-43.2-17.83-25.37 0-43.66 17.73-18.29 17.72-18.29 43.24 0 25.51 18.28 43.76 18.28 18.24 43.62 18.24Zm-.41 122.31q32.21 0 58.68-13.97 26.48-13.98 44.09-39.06-24.28-13.79-49.78-20.79t-52.99-7q-27.49 0-53.32 7-25.83 7-49.45 20.79 17.62 25.08 43.76 39.06 26.14 13.97 59.01 13.97Z" />
            </svg>
            Datenschutz
          </NavLink>
          <NavLink
            to={`/Account/${auth.currentUser?.uid}`}
            className="menuLink"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#000000"
            >
              <path d="M234.97-258.15q56.95-38.26 116.33-59.23 59.37-20.98 128.7-20.98 69.33 0 128.91 20.98 59.58 20.97 116.53 59.23 41.51-47.36 62.91-102.77 21.39-55.41 21.39-119.08 0-138.69-95.52-234.22-95.53-95.52-234.22-95.52t-234.22 95.52Q150.26-618.69 150.26-480q0 63.67 21.6 119.08t63.11 102.77Zm244.91-196.72q-54.24 0-91.32-37.2-37.07-37.2-37.07-91.44 0-54.23 37.2-91.31 37.2-37.08 91.43-37.08 54.24 0 91.32 37.2 37.07 37.2 37.07 91.44 0 54.23-37.2 91.31-37.2 37.08-91.43 37.08ZM479.73-100q-78.99 0-148.43-29.77-69.43-29.77-120.8-81.41-51.37-51.64-80.93-120.75Q100-401.04 100-480.33q0-79.04 29.77-148.28t81.41-120.54q51.64-51.31 120.75-81.08Q401.04-860 480.33-860q79.04 0 148.28 29.77t120.54 81.08q51.31 51.3 81.08 120.65Q860-559.15 860-480.18q0 79.24-29.77 148.3-29.77 69.06-81.08 120.7-51.3 51.64-120.74 81.41Q558.98-100 479.73-100Z" />
            </svg>
            Account
          </NavLink>
        </div>
      </div>
    </>
  );
}
