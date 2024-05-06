import React from "react";
import "./ActionButton.css";
// Define the props interface
interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="SignOutButton fade-in-fwd">
      {children}
    </button>
  );
};

export default ActionButton;
