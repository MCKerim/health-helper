import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import Header from "../../components/organisms/header/Header";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import { createChat, getChat, saveMessageToChat } from "../../firebase";
import { OpenAI } from "openai";

const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { id: chatId } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    setMessages([]); // Clear messages on load (to prevent duplicates on re-render)
    if (chatId) {
      getChat(chatId).then((chat) => {
        if (chat) {
          setMessages(chat.messages);
        }
      });
    }
  }, [chatId]);

  async function makeOpenAICall(chatMessages: Message[]): Promise<Message> {
    let messagesConverted = chatMessages.map((message) => {
      return { role: message.sender, content: message.message };
    });

    console.log(messagesConverted);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are doctor." },
        ...messagesConverted,
      ],
      model: "gpt-3.5-turbo",
    });

    const newBotMessage: Message = {
      sender: "assistant",
      message:
        completion.choices[completion.choices.length - 1].message.content ??
        "Error",
    };

    return newBotMessage;
  }

  async function sendMessagePressed() {
    if (messageInput === "") {
      return;
    }
    const newUserMessage: Message = { sender: "user", message: messageInput };
    const updatedMessages = [...messages, newUserMessage];

    if (!chatId) {
      setMessages(updatedMessages);
      // No chat ID available, create a new chat document
      createChat(newUserMessage)
        .then((docRefId: string) => {
            saveMessageToChat(newUserMessage, docRefId).then(() => {
              makeOpenAICall(updatedMessages)
                .then((newBotMessage) => {
                  saveMessageToChat(newBotMessage, docRefId).then(() => {
                    navigate(`/chat/${docRefId}`);
                  });
                })
                .catch((error) => {
                  console.error("Error making OpenAI API call:", error);
                });
            }).catch((error) => {
              console.error("Error saving message to Firestore:", error);
            });
        })
        .catch((error) => {
          console.error("Error creating chat in Firestore:", error);
        });
    } else {
      await saveMessageToChat(newUserMessage, chatId)
        .then(() => {
          makeOpenAICall(updatedMessages)
            .then((newBotMessage) => {
              saveMessageToChat(newBotMessage, chatId);
              setMessages([...updatedMessages, newBotMessage]);
            })
            .catch((error) => {
              console.error("Error making OpenAI API call:", error);
            });
        })
        .catch((error) => {
          console.error("Error saving message to Firestore:", error);
        });
    }
    setMessageInput("");
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
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onClick={sendMessagePressed}
        />
      </div>
    </div>
  );
};

export default withAuth(Chat);
