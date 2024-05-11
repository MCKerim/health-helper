import React, { useRef, useEffect } from "react";
import DrawerMenuContent from "../../atoms/drawerMenuContent/DrawerMenuContent";
import HamburgerMenu from "../../atoms/drawerHamburgerIcon/DrawerHamburgerIcon";
import { useSwipeable } from "react-swipeable";

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function DrawerMenu({ isOpen, toggleDrawer }: Props) {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        node.current &&
        !node.current.contains(event.target as Node) &&
        isOpen
      ) {
        toggleDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDrawer]);

  // Always visible swipe trigger
  const edgeSwipeTrigger = useSwipeable({
    onSwipedLeft: () => !isOpen && toggleDrawer(), // Only open if closed
    onSwipedRight: () => isOpen && toggleDrawer(), // Only close if open
    trackMouse: true,
    delta: 10, // How far the swipe needs to move to be recognized
  });

  const drawerSwipeTrigger = useSwipeable({
    onSwipedRight: () => isOpen && toggleDrawer(), // Only close if open
    trackMouse: true,
    delta: 10, // How far the swipe needs to move to be recognized
  });

  return (
    <div ref={node}>
      <div
        {...edgeSwipeTrigger}
        style={{
          width: "250px",
          height: "calc(100vh - 150px)",
          position: "absolute",
          right: 0,
          top: "80px",
          bottom: 0,
          zIndex: 2,
        }}
      />
      <DrawerMenuContent isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <HamburgerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
