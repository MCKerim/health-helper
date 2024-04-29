import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, collection, addDoc, getFirestore } from "firebase/firestore";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import Header from "../../components/organisms/header/Header";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import { createChat, saveMessageToChat } from "../../firebase";

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const db = getFirestore(); // Ensure Firebase is initialized and Firestore is imported

  async function sendMessagePressed() {
    if (message === "") {
      return;
    }
    const newMessage: Message = { sender: "user", message };

    if (!id) {
      // No chat ID available, create a new chat document
      const newId = await createChat(newMessage);
      navigate(`/chat/${newId}`); // Redirect to the new chat path
      // Update local state to include the first message and an automatic bot response
      setMessages([
        ...messages,
        newMessage,
        { sender: "bot", message: "default answer" },
      ]);
    } else {
      // ID exists, just append the new message
      await saveMessageToChat(newMessage, id);
      setMessages([
        ...messages,
        newMessage,
        { sender: "bot", message: "default answer" },
      ]);
    }
    setMessage("");
  }

  return (
    <div className={"App"}>
      <Header />
      <MessagesWindow messages={messages} />
      <div className={"BackgroundTextContainer"}>
        <h1 className={"BackgroundText"}>Health~Helper</h1>
      </div>
      <div>
        <div className={"BackgroundDisclaimer"}>
          <p className={"BackgroundText"}>
            ~Bitte sprechen sie mit einem richtigen Arzt~
          </p>
        </div>
        <SendTextFooter
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onClick={sendMessagePressed}
        />
      </div>
    </div>
  );
};

export default withAuth(Chat);
