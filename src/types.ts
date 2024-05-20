export type UserMessage = {
  sender: "user";
  message: string;
};

export type BotMessage = {
  sender: "assistant";
  message: string;
  isLiked: boolean;
  isDisliked: boolean;
};

export type Message = UserMessage | BotMessage;
