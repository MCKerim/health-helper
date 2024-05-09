import React, { useEffect, useRef } from "react";
import DrawerMenuContent from "../../atoms/drawerMenuContent/DrawerMenuContent";
import HamburgerMenu from "../../atoms/drawerHamburgerIcon/DrawerHamburgerIcon";

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function DrawerMenu({ isOpen, toggleDrawer }: Props) {
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
    <>
      <HamburgerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <DrawerMenuContent isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </>
  );
}
