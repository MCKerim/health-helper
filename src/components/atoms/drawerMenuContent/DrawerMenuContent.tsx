import "./DrawerMenuContent.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { signOutUser } from "../../../firebase";
const DrawerMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className={`drawer ${isOpen ? "isOpen" : "isClosed"}`}>
      <ul className="menuList">
        <li>Neuer Chat</li>
        <li>Chat Verlauf</li>
        <li>Einstellungen</li>
        <li>
          <NavLink to={"/Account/test"} className={"menuLink"}>
            Account
          </NavLink>
        </li>
        <li>Datenschutz</li>
      </ul>
      <button className={"SignOutButton"} onClick={signOutUser}>
        Abmelden
      </button>
    </div>
  );
};

export default DrawerMenu;
