import "./DrawerMenuContent.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  auth,
  getChatIDsFromUID,
  signOutUser,
  removeChat,
} from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../actionButton/ActionButton";

const DrawerMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [chatList, setChatList] = useState<string[]>([]);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  useEffect(() => {
    getChatIDsFromUID(auth.currentUser?.uid).then((chats) => {
      if (chats) {
        setChatList(chats);
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
          <div onClick={toggleChatList}>Chats</div>
          {isChatListOpen && (
            <ul className={`menuList menuListInner`}>
              {chatList.map((chat, index) => (
                <li key={index + 1} className={"menuListItem"}>
                  <NavLink to={`/chat/${chat}`} className="menuLink">
                    Chat {index + 1}
                  </NavLink>
                  <div className={"trashCanIcon"}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "#98ceb5" }}
                      onClick={() => {
                        removeChat(chat);
                        setChatList(
                          chatList.filter((chatID) => chatID !== chat),
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
