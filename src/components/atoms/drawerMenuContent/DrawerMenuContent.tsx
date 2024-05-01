import "./DrawerMenuContent.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { auth, getChatIDsFromUID, signOutUser } from "../../../firebase";
import firebase from "firebase/compat";

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
        <li
          className={`listStart ${isChatListOpen ? "open" : ""}`}
          onClick={toggleChatList}
        >
          <div>Chats</div>
          {isChatListOpen && (
            <ul className={`menuList menuListInner`}>
              {chatList.map((chat, index) => (
                <li key={index}>
                  <NavLink to={`/chat/${chat}`} className="menuLink">
                    Chat {index}
                  </NavLink>
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
      <button className="SignOutButton" onClick={signOutUser}>
        Abmelden
      </button>
    </div>
  );
};

export default DrawerMenu;
