import React, { useState } from "react";
import DrawerMenu from "../../molecules/drawerMenu/DrawerMenu";
import HeaderLogo from "../../atoms/headerLogo/HeaderLogo";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <HeaderLogo />
      <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};
