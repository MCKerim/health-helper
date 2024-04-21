import { useState } from "react";
import Textfield from "../../components/atoms/textfield/Textfield";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";
import SendTextButton from "../../components/atoms/sendTextButton/SendTextButton";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import Header from "../../components/organisms/header/Header";
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
      <div>
        <Header></Header>
      </div>

      <nav>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
      </nav>

      {/** Messages window */}
      <MessagesWindow messages={messages} />
      <div className={"BackgroundTextContainer"}>
        <h1 className={"BackgroundText"}>Health~Helper</h1>
      </div>
      {/** Input */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <p className={"BackgroundText"}>
          ~Bitte sprechen sie mit einem richtigen Arzt~
        </p>
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
