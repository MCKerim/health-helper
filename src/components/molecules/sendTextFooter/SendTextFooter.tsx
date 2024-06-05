import "./SendTextFooter.css";
import SendTextButton from "../../atoms/sendTextButton/SendTextButton";
import React from "react";
import SpeechToTextButton from "../../atoms/speechToTextButton/SpeechToTextButton";
import Textfield from "../../atoms/textfield/Textfield";

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
        <Textfield placeholder="Schreibe deine Antwort..." value={value} onChange={onChange} onKeyDown={handleKeyDown} type="text" contained />
        <SendTextButton onClick={onClick} />
      </div>
    </div>
  );
}
