import "./MessageBox.css";

export type Message = {
  sender: "user" | "bot"
  message: string
}

export default function MessageBox({ sender, message }: Message) {
  return (
    <div className={"MessageBox " + (sender === "user" ? "MessageBoxUser" : "MessageBoxBot")}>
      <p className="MessageSender">{sender}:</p>
      <p className="MessageText">{message}</p>
    </div>
  );
}