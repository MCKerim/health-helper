import React, { useState } from "react";
import DrawerMenu from "../../atoms/drawerMenuContent/DrawerMenuContent";
import HamburgerMenu from "../../atoms/drawerHamburgerIcon/DrawerHamburgerIcon";

interface AppProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const App: React.FC<AppProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div>
      <HamburgerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <DrawerMenu isOpen={isOpen} />
    </div>
  );
};

export default App;
