import MessageBox, { Message } from "../../atoms/messageBox/MessageBox";

type Props = {
  messages: Message[]
}

export default function MessagesWindow({ messages }: Props) {

  function renderMessages() {
    return messages.map((message, index) => {
      return <MessageBox
        key={message.message + index}
        sender={message.sender}
        message={message.message}
      />;
    });
  }

  return (
    <div>
      {renderMessages()}
    </div>
  );
}