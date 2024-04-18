import { useState } from "react";
import Textfield from "../../components/atoms/textfield/Textfield";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessagePressed() {
    if (message === "") {
      return;
    }
    setMessages([...messages, { sender: "user", message: message }, { sender: "bot", message: "default answear" }]);
    setMessage("");
  }

  return (
    <div>
      <h1>Chat</h1>
      <nav>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
      </nav>

      {/** Messages window */}
      <MessagesWindow messages={messages} />

      {/** Input */}
      <div>
        <Textfield
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessagePressed}>Send</button>
      </div>
    </div>
  );
}
