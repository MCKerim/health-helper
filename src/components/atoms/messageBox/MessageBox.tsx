import "./MessageBox.css";

export type Message = {
  sender: "user" | "bot";
  message: string;
};

export default function MessageBox({ sender, message }: Message) {
  return (
    <div
      className={
        "MessageBox " +
        (sender === "user"
          ? "MessageBoxUser fade-in-right "
          : "MessageBoxBot fade-in-left")
      }
    >
      <div className={"MessageContentContainer"}>
        <p className="MessageSender">
          {sender === "user" ? "Du" : "Health Helper"}
        </p>
        <p className="MessageText">{message}</p>
      </div>
    </div>
  );
}
