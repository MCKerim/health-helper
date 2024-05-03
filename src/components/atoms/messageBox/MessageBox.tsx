import "./MessageBox.css";

export type Message = {
  sender: "user" | "assistant";
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
      <div
        className={
          "MessageContentContainer " +
          (sender === "user"
            ? "MessageBoxUserContentContainer"
            : "MessageBoxBotContentContainer")
        }
      >
        <p className="MessageSender">
          {sender === "user" ? "Du" : "Health Helper"}
        </p>
        <p className="MessageText">{message}</p>
      </div>
    </div>
  );
}
