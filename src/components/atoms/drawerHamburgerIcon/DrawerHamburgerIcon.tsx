import React from "react";
import "./DrawerHamburgerIcon.css";

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export default function DrawerHamburgerIcon({
  isOpen,
  toggleDrawer,
}: Readonly<Props>) {
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
}
