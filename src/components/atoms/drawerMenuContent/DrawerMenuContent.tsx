import "./DrawerMenuContent.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth, signOutUser } from "../../../firebase";
const DrawerMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className={`drawer ${isOpen ? "isOpen" : "isClosed"}`}>
      <ul className="menuList">
        <li>Neuer Chat</li>
        <li>Chat Verlauf</li>
        <li>Einstellungen</li>
        <li>
          <NavLink
            to={`/Account/${auth.currentUser?.uid}`}
            className={"menuLink"}
          >
            Account
          </NavLink>
        </li>
        <li>
          <NavLink to={"/Datenschutz"} className={"menuLink"}>
            Datenschutz
          </NavLink>
        </li>
      </ul>
      <button className={"SignOutButton"} onClick={signOutUser}>
        Abmelden
      </button>
    </div>
  );
};

export default DrawerMenu;
