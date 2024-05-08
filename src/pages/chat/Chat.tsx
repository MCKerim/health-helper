import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import { Message } from "../../components/atoms/messageBox/MessageBox";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import Header from "../../components/organisms/header/Header";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import { createChat, getChat, saveMessageToChat } from "../../firebase";
import { OpenAI } from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";
const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
        {
          role: "system",
          content:
            "You are a doctor and or a Therapist. Try to advise your client to the best of your abilities without diagnosing them, however do name certain possibilities as clear hypotheticals. Keep your answers as concise as possible, and avoid using medical jargon. Try to ask if something is not clear. You are encouraged to pose a lot of questions if it furthers a possible narrowing down of the problem. You can Use Markdown to format your messages.",
        },
        ...messagesConverted,
      ],
      temperature: 0.2,
      max_tokens: 150,
      top_p: 0.7,
      frequency_penalty: 0.5,
      presence_penalty: 0.4,
      model: "gpt-3.5-turbo",
    });

    const content =
      completion.choices[completion.choices.length - 1].message.content;

    const markedContent = await marked.parse(content ? content : "Error");
    const safeContent = content ? DOMPurify.sanitize(markedContent) : "Error";

    const newBotMessage: Message = {
      sender: "assistant",
      message: safeContent,
    };

    return newBotMessage;
  }

  async function sendMessagePressed() {
    if (messageInput === "") return;

    setIsLoading(true); // Start loading at the beginning
    const newUserMessage: Message = { sender: "user", message: messageInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    try {
      let docRefId = chatId;
      if (!chatId) {
        // No chat ID available, create a new chat document
        docRefId = await createChat(newUserMessage);
        setMessages(updatedMessages);
        await saveMessageToChat(newUserMessage, docRefId);
        setMessageInput("");
      } else {
        await saveMessageToChat(newUserMessage, chatId);
        setMessages(updatedMessages);
        setMessageInput("");
      }

      const newBotMessage = await makeOpenAICall(updatedMessages);
      await saveMessageToChat(newBotMessage, docRefId);
      setMessages([...updatedMessages, newBotMessage]);

      if (!chatId) navigate(`/chat/${docRefId}`);
    } catch (error) {
      console.error("Error during chat operation:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  }

  return (
    <div className={"App"}>
      <Header />
      <MessagesWindow messages={messages} isLoading={isLoading} />
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
