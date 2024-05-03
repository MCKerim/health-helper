import React, { useEffect, useRef, useState } from "react";
import DrawerMenu from "../../atoms/drawerMenuContent/DrawerMenuContent";
import HamburgerMenu from "../../atoms/drawerHamburgerIcon/DrawerHamburgerIcon";

interface AppProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const App: React.FC<AppProps> = ({ isOpen, toggleDrawer }) => {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle click events on document
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the node
      if (node.current && !node.current.contains(event.target as Node)) {
        // If drawer is open and click is outside, toggle the drawer
        if (isOpen) {
          toggleDrawer();
        }
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener from the document
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDrawer]);

  return (
    <div ref={node}>
      <HamburgerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <DrawerMenu isOpen={isOpen} />
    </div>
  );
};

export default App;
