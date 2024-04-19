import { useState } from "react";
import Textfield from "../../components/atoms/textfield/Textfield";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";
import SendTextButton from "../../components/atoms/sendTextButton/SendTextButton";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import HeaderLogo from "../../components/atoms/headerLogo/HeaderLogo";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessagePressed() {
    if (message === "") {
      return;
    }
    setMessages([
      ...messages,
      { sender: "user", message: message },
      { sender: "bot", message: "default answer" },
    ]);
    setMessage("");
  }

  return (
    <div>
      <HeaderLogo></HeaderLogo>
      <nav>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
      </nav>

      {/** Messages window */}
      <MessagesWindow messages={messages} />

      {/** Input */}
      <div>
        <SendTextFooter
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onClick={sendMessagePressed}
        ></SendTextFooter>
      </div>
    </div>
  );
}
