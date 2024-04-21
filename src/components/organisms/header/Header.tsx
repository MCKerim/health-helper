import React, { useState } from "react";
import DrawerMenu from "../../molecules/drawerMenu/DrawerMenu";
import HeaderLogo from "../../atoms/headerLogo/HeaderLogo";
import "./Header.css";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={"header"}>
      <HeaderLogo></HeaderLogo>
      <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Header;
