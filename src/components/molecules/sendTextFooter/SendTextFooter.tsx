import "./SendTextFooter.css";
import Textfield from "../../atoms/textfield/Textfield";
import SendTextButton from "../../atoms/sendTextButton/SendTextButton";
import React from "react";

type props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

export default function SendTextFooter({ value, onChange, onClick }: props) {
  return (
    <div className="send-text-footer-container">
      <div className="footer">
        <Textfield
          placeholder="Schreibe deine Frage..."
          className={"sendTextBox"}
          value={value}
          onChange={onChange}
        />
        <SendTextButton onClick={onClick} />
      </div>
    </div>
  );
}
