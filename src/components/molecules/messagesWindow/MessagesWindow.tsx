import MessageBox, { Message } from "../../atoms/messageBox/MessageBox";
import "./MessagesWindow.css";
import React, { useEffect, useRef } from "react";
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
          return (
            <MessageBox
              key={message.message + index}
              sender={message.sender}
              message={message.message}
            />
          );
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
