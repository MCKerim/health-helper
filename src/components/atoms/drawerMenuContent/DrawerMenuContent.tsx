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

const DrawerMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [chatList, setChatList] = useState<ChatInfo[]>([]);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

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
    <div className={`drawer ${isOpen ? "isOpen" : "isClosed"}`}>
      <ul className="menuList">
        <li>
          <NavLink to={"/"} className="menuLink">
            Neuer Chat
          </NavLink>
        </li>
        <li className={`listStart ${isChatListOpen ? "open" : ""}`}>
          <div onClick={toggleChatList}>Chats</div>{" "}
          <div className={`ArrowLeft`}></div>
          <div className={`ArrowRight`}></div>
          {isChatListOpen && (
            <ul className={`menuList menuListInner`}>
              {chatList.map((chat, index) => (
                <li key={chat.id} className={"menuListItem"}>
                  <NavLink to={`/chat/${chat.id}`} className="menuLink">
                    Chat {index + 1}
                  </NavLink>
                  <div className={"trashCanIcon"}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "#98ceb5" }}
                      onClick={() => {
                        removeChat(chat.id);
                        setChatList(
                          chatList.filter(
                            (chatInfo) => chatInfo.id !== chat.id,
                          ),
                        );
                        if (chatList.length === 1) {
                          setIsChatListOpen(false);
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>Einstellungen</li>
        <li>
          <NavLink
            to={`/Account/${auth.currentUser?.uid}`}
            className="menuLink"
          >
            Account
          </NavLink>
        </li>
        <li>
          <NavLink to={"/Datenschutz"} className="menuLink">
            Datenschutz
          </NavLink>
        </li>
      </ul>
      <ActionButton onClick={signOutUser}>Abmelden</ActionButton>
    </div>
  );
};

export default DrawerMenu;
