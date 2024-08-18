import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessagesWindow from "../../components/molecules/messagesWindow/MessagesWindow";
import SendTextFooter from "../../components/molecules/sendTextFooter/SendTextFooter";
import Header from "../../components/organisms/header/Header";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import {
  changeChatTitle,
  createChat,
  getChat,
  getStartingPrompt,
  saveMessageToChat,
} from "../../firebase";
import { OpenAI } from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useChats } from "../../components/contexts/chatContext/ChatContext";
import { useSpeech } from "../../components/contexts/speechContext/SpeechContext";
import { Message } from "../../types";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../translation/types/TranslationKeys";

const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id: chatId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { updateChats } = useChats();
  const { t } = useTranslation();
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const { transcript, listening } = useSpeech();

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

  useEffect(() => {
    setMessageInput(transcript);
  }, [listening]);

  const isPowerOfTwo = (num: number) => {
    // Check if num is greater than 0 and is a power of two using bitwise AND
    return num > 0 && (num & (num - 1)) === 0;
  };

  async function makeOpenAICall(chatMessages: Message[]): Promise<Message> {
    let messagesConverted = chatMessages.map((message) => {
      return { role: message.sender, content: message.message };
    });
    const startingPrompt = await getStartingPrompt("3TZHR5XggT3hpVS0b3Qc");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: startingPrompt,
        },
        ...messagesConverted,
      ],
      temperature: 0.2,
      top_p: 0.7,
      frequency_penalty: 0.5,
      presence_penalty: 0.4,
      model: "gpt-4o-mini",
    });

    const content =
      completion.choices[completion.choices.length - 1].message.content;

    const markedContent = await marked.parse(content ? content : "Error");
    const safeContent = content ? DOMPurify.sanitize(markedContent) : "Error";

    const newBotMessage: Message = {
      sender: "assistant",
      message: safeContent,
      isLiked: false,
      isDisliked: false,
    };

    return newBotMessage;
  }

  async function makeOpenAISummaryCall(updatedMessages: Message[]) {
    let messagesConverted = updatedMessages.map((message) => {
      return { role: message.sender, content: message.message };
    });
    const summaryPrompt = await getStartingPrompt("1ujoKGPyfw0xa3DXLGpr");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: summaryPrompt,
        },
        ...messagesConverted,
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 20,
      frequency_penalty: 0.5,
      presence_penalty: 0.4,
      model: "gpt-4o-mini",
    });

    return completion.choices[completion.choices.length - 1].message.content;
  }

  async function sendMessagePressed() {
    if (messageInput === "") return;

    setIsLoading(true); // Start loading at the beginning
    const newUserMessage: Message = {
      sender: "user",
      message: messageInput,
    };
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

      if (!chatId) {
        navigate(`/chats/${docRefId}`);
        await updateChats();
      }

      if (isPowerOfTwo(messages.length)) {
        const title = await makeOpenAISummaryCall(messages);
        await changeChatTitle(chatId, title);
        await updateChats();
      }
    } catch (error) {
      console.error("Error during chat operation:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  }

  return (
    <div className="App">
      <Header />
      <MessagesWindow messages={messages} isLoading={isLoading} />
      <div className="BackgroundTextContainer">
        <h1 className="BackgroundText">
          {messages.length === 0 && "Health~Helper"}
        </h1>
      </div>
      <div>
        <div className="BackgroundDisclaimer">
          <p className="BackgroundText">
            {t(TranslationKeys.disclaimer_medical_advice)}
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
