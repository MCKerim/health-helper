import React, { useState } from "react";
import Textfield from "../../components/atoms/textfield/Textfield";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";
import SendTextButton from "../../components/atoms/sendTextButton/SendTextButton";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import Header from "../../components/organisms/header/Header";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";

export const Chat: React.FC = () => {
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
    <div className={"App"}>
      <div>
        <Header></Header>
      </div>

      {/** Messages window */}
      <MessagesWindow messages={messages} />
      <div className={"BackgroundTextContainer"}>
        <h1 className={"BackgroundText"}>Health~Helper</h1>
      </div>
      {/** Input */}
      <div>
        <div className={"BackgroundDisclaimer"}>
          <p className={"BackgroundText"}>
            ~Bitte sprechen sie mit einem richtigen Arzt~
          </p>
        </div>
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
};

export default withAuth(Chat);
