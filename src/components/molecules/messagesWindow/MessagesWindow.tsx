import MessageBox, { Message } from "../../atoms/messageBox/MessageBox";
import "./MessagesWindow.css";
type Props = {
  messages: Message[];
};

export default function MessagesWindow({ messages }: Props) {
  function renderMessages() {
    return (
      <div className={"MessagesWindow"}>
        {messages.map((message, index) => {
          return (
            <MessageBox
              key={message.message + index}
              sender={message.sender}
              message={message.message}
            />
          );
        })}
      </div>
    );
  }

  return <div>{renderMessages()}</div>;
}
