import "./MessageBox.css";
import { Message } from "../../../types";
import { reactToMessage } from "../../../firebase";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {TranslationKeys} from "../../../translation/types/TranslationKeys";
import {useTranslation} from "react-i18next";

/**
 * Box to display messages send by users or chatbot
 */
export default function MessageBox(props: Message) {
  const { sender, message } = props;
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const {t} = useTranslation();
  useEffect(() => {
    if (props.sender !== "user") {
      setIsLiked(props.isLiked);
      setIsDisliked(props.isDisliked);
    }
  }, []);
  // Function to extract chatId from the URL
  const getChatIdFromUrl = () => {
    const pathParts = location.pathname.split("/");
    const chatIdIndex = pathParts.findIndex((part) => part === "chats") + 1;
    return pathParts[chatIdIndex];
  };

  const chatId = getChatIdFromUrl();

  const UpdateReaction = (typeOfReaction: string) => {
    if (typeOfReaction === "like") {
      if (isLiked) {
        reactToMessage(chatId, message, "like");
        setIsLiked(false);
      } else {
        reactToMessage(chatId, message, "like");
        setIsLiked(true);
        if (isDisliked) {
          reactToMessage(chatId, message, "dislike");
          setIsDisliked(false);
        }
      }
    } else if (typeOfReaction === "dislike") {
      if (isDisliked) {
        reactToMessage(chatId, message, "dislike");
        setIsDisliked(false);
      } else {
        reactToMessage(chatId, message, "dislike");
        setIsDisliked(true);
        if (isLiked) {
          reactToMessage(chatId, message, "like");
          setIsLiked(false);
        }
      }
    }
  };

  return (
    <div
      className={
        "MessageBox " +
        (sender === "user"
          ? "MessageBoxUser fade-in-right"
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
          {sender === "user" ? t(TranslationKeys.messagebox_user_term) : "Health Helper"}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: message }}
          className="MessageText"
        ></p>
        {sender === "assistant" && (
          <div className={"MessageReactions"}>
            <svg
              className={"ReactionIcon " + (isLiked ? "Active" : "")}
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => UpdateReaction("like")}
            >
              <path
                d="M20.22 9.55c-.43-.51-1.05-.8-1.72-.8h-4.03V6c0-1.52-1.23-2.75-2.83-2.75-.7 0-1.33.42-1.61 1.07l-2.54 5.93H5.62c-1.31 0-2.37 1.06-2.37 2.37v5.77c0 1.3 1.07 2.36 2.37 2.36h11.56c1.09 0 2.02-.78 2.21-1.86l1.32-7.5c.11-.66-.07-1.33-.5-1.84h.01Zm-14.6 9.7c-.48 0-.87-.39-.87-.86v-5.77c0-.48.39-.87.87-.87h1.61v7.5H5.62Zm12.3-.62c-.06.36-.37.62-.74.62H8.74v-8.1l2.67-6.25c.04-.09.13-.16.32-.16.69 0 1.24.56 1.24 1.25v4.25h5.53c.23 0 .43.09.57.26.14.17.2.39.16.62l-1.32 7.5.01.01Z"
                fill="currentcolor"
              />
            </svg>
            <svg
              className={"ReactionIcon " + (isDisliked ? "Active" : "")}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="scale(1 -1)"
              onClick={() => UpdateReaction("dislike")}
            >
              <path
                d="M20.22 9.55c-.43-.51-1.05-.8-1.72-.8h-4.03V6c0-1.52-1.23-2.75-2.83-2.75-.7 0-1.33.42-1.61 1.07l-2.54 5.93H5.62c-1.31 0-2.37 1.06-2.37 2.37v5.77c0 1.3 1.07 2.36 2.37 2.36h11.56c1.09 0 2.02-.78 2.21-1.86l1.32-7.5c.11-.66-.07-1.33-.5-1.84h.01Zm-14.6 9.7c-.48 0-.87-.39-.87-.86v-5.77c0-.48.39-.87.87-.87h1.61v7.5H5.62Zm12.3-.62c-.06.36-.37.62-.74.62H8.74v-8.1l2.67-6.25c.04-.09.13-.16.32-.16.69 0 1.24.56 1.24 1.25v4.25h5.53c.23 0 .43.09.57.26.14.17.2.39.16.62l-1.32 7.5.01.01Z"
                fill="currentcolor"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
