import React from "react";
import "./DrawerHamburgerIcon.css";
const HamburgerMenu: React.FC<{
  isOpen: boolean;
  toggleDrawer: () => void;
}> = ({ isOpen, toggleDrawer }) => {
  return (
    <div className={"container"}>
      <div
        className={`menuIcon ${isOpen ? "isOpen" : ""}`}
        onClick={toggleDrawer}
      >
        <div className={`${isOpen ? "isOpen" : ""}`}></div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
