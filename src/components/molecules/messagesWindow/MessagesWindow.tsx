import MessageBox from "../../atoms/messageBox/MessageBox";
import "./MessagesWindow.css";
import React, { useEffect, useRef } from "react";
import { Message } from "../../../types";
type Props = {
  messages: Message[];
  isLoading: boolean;
};

export default function MessagesWindow({ messages, isLoading }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref

  useEffect(() => {
    // Automatically scroll to the latest message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Dependency on messages ensures this runs every time messages update

  function renderMessages() {
    return (
      <div className="MessagesWindow">
        {messages.map((message, index) => {
          if (message.sender === "user") {
            return (
              <MessageBox
                key={index}
                sender={message.sender}
                message={message.message}
              />
            );
          } else {
            return (
              <MessageBox
                key={message.message + index}
                sender={message.sender}
                message={message.message}
                isLiked={message.isLiked}
                isDisliked={message.isDisliked}
              />
            );
          }
        })}
        {isLoading && (
          <div className={"LoaderContainer"}>
            <div className={"loader"} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return <div>{renderMessages()}</div>;
}
