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
          width: "12%",
          height: "calc(100vh - 150px)",
          position: "absolute",
          right: 0,
          top: "80px",
          bottom: 0,
        }}
      >
        <svg
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            color: "rgba(0, 0, 0, 0.075)",
          }}
          width={50}
          height={50}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m15 7-5 5 5 5"
            stroke="currentcolor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <DrawerMenuContent isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <HamburgerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
