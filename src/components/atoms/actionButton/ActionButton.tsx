import React from "react";

// Define the props interface
interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="ActionButton">
      {children}
    </button>
  );
};

export default ActionButton;
