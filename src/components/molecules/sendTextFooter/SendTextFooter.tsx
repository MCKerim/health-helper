import "./SendTextFooter.css";
import Textfield from "../../atoms/textfield/Textfield";
import SendTextButton from "../../atoms/sendTextButton/SendTextButton";
import React from "react";
import SpeechToTextButton from "../../atoms/speechToTextButton/SpeechToTextButton";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

export default function SendTextFooter({ value, onChange, onClick }: Readonly<Props>) {
  // Function to handle key events in the Textfield
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action of moving to the next focusable item
      onClick(); // Trigger the onClick function
    }
  };

  return (
    <div className="send-text-footer-container">
      <div className="footer">
        <SpeechToTextButton />
        <Textfield
          placeholder="Schreibe deine Frage..."
          className="sendTextBox"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown} // Bind the key handler
        />
        <SendTextButton onClick={onClick} />
      </div>
    </div>
  );
}
