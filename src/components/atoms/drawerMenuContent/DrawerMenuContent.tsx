import "./DrawerMenuContent.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  auth,
  getChatIDsFromUID,
  signOutUser,
  removeChat,
  getChatsFromUID,
} from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../actionButton/ActionButton";

type ChatInfo = {
  id: string;
  timestamp?: number;
};

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export default function DrawerMenuContent({ isOpen, toggleDrawer }: Props) {
  const [chatList, setChatList] = useState<ChatInfo[]>([]);
  const [isChatListOpen, setIsChatListOpen] = useState(true);

  useEffect(() => {
    getChatsFromUID(auth.currentUser?.uid).then((chats) => {
      if (chats) {
        // Assuming chats is now an array of objects { id, timestamp }
        const sortedChats = chats.sort((a, b) => {
          // Sort such that entries without timestamps are placed at the end
          return a.data.timestamp === null
            ? 1
            : b.data.timestamp === null
              ? -1
              : b.data.timestamp - a.data.timestamp;
        });
        setChatList(sortedChats);
      }
    });
  }, []);

  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  return (
    <>
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
      <div className={`drawer ${isOpen ? "isOpen" : "isClosed"}`}>
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
          </NavLink>

          <div className={`listStart ${isChatListOpen ? "open" : ""}`}>
            <div
              onClick={toggleChatList}
              style={{
                borderBottom: "1px solid lightgray",
                textAlign: "start",
                paddingLeft: "20px",
                fontWeight: "bold",
              }}
            >
              Chat Verlauf
            </div>
            <div className="ArrowLeft" />
            <div className="ArrowRight" />

            <ol className="menuList">
              {chatList.map((chat, index) => (
                <li key={chat.id} className="menuListItem">
                  <NavLink
                    to={`/chat/${chat.id}`}
                    onClick={toggleDrawer}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Chat {index + 1}
                  </NavLink>
                  <div className="trashCanIcon">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => {
                        removeChat(chat.id);
                        setChatList(
                          chatList.filter((chatInfo) => chatInfo.id !== chat.id)
                        );
                        if (chatList.length === 1) {
                          setIsChatListOpen(false);
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "2.5px",
            marginBottom: "25px",
            borderTop: "1px solid lightgray",
            paddingTop: "5px",
          }}
        >
          <NavLink to={"/Datenschutz"} className="menuLink">
            Datenschutz
          </NavLink>
          <NavLink
            to={`/Account/${auth.currentUser?.uid}`}
            className="menuLink"
          >
            Account
          </NavLink>
        </div>
      </div>
    </>
  );
}
