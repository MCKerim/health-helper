// @ts-nocheck
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
  saveMessageToChat, uploadImage,
} from "../../firebase";
import { OpenAI } from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useChats } from "../../components/contexts/chatContext/ChatContext";
import { useSpeech } from "../../components/contexts/speechContext/SpeechContext";
import {Message, UserMessage} from "../../types";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../translation/types/TranslationKeys";

const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const { id: chatId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { updateChats } = useChats();
  const { t } = useTranslation();
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const { transcript, listening } = useSpeech();

  const handleImageSelect = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    setUploading(true);
    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await uploadImage(image);
        console.log(imageUrl)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    setUploading(false);
    sendMessagePressed(messageInput, imageUrl);
  };


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
    console.log(transcript);
  }, [listening]);

  async function makeOpenAICall(chatMessages: Message[]): Promise<Message> {
    // Convert the chat messages to the format expected by the OpenAI API
    let messagesConverted = chatMessages.map((message) => {
      let imageUrl = ''
      if (message.sender !== "assistant" && message?.imageUrl) {
           imageUrl = message.imageUrl
        console.log(imageUrl)
      }
      return imageUrl != '' ? { role: message.sender, content: [
          { type: "text", text: message.message },
          {
            type: "image_url",
            image_url: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
            },
          },
        ], } : { role: message.sender, content: message.message };
    });

    console.log(messagesConverted);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Role: Doctor/Therapist
Objective: Advise clients to the best of your ability while providing hypothetical diagnoses and potential causes for their symptoms.
Guidelines:

Hypothesize, Don't Diagnose: Offer possible scenarios or causes for symptoms in a hypothetical manner without giving a definitive diagnosis. When mentioning specific conditions or diseases, subtly link to a reputable medical resource embedded within the relevant terms for further information.
Simplicity and Clarity: Keep your responses concise and free of medical jargon. Use simple, clear language to explain possible conditions and advice.
Active Engagement: Ask one clarifying question, the most probable to ask, to better understand the client's situation. This helps in narrowing down potential issues.
Encourage Detailed Responses: Use open-ended questions to encourage clients to provide more detailed information, which can be crucial for understanding their situation.
Markdown Formatting: Utilize HTML to format your messages for better readability. This includes using bullet points, a bold tag for emphasis, and italics for hypothetical scenarios.

Example Interaction:

User: I've been feeling unusually tired lately with some occasional headaches.
AI (as Doctor/Therapist): It sounds like you're dealing with some challenging symptoms. Fatigue and headaches can be caused by a variety of factors, such as stress or dietary changes. Could it be stress-related, or have there been any recent changes in your lifestyle? Additionally, how would you rate your headaches on a scale from 1 to 10, and are there specific times of the day they occur?`,
        },
        ...messagesConverted,
      ],
      temperature: 0.2,
      top_p: 0.7,
      frequency_penalty: 0.5,
      presence_penalty: 0.4,
      model: "gpt-4o-mini",
    });

    const content = completion.choices[completion.choices.length - 1].message.content;

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

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Create a Caption for the provided conversation. It should not exceed 3 words.`,
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

  async function sendMessagePressed(message: string, imageUrl: string | null) {
    if (message === "" && !imageUrl) return;

    setIsLoading(true); // Start loading at the beginning
    console.log("imageurl:",imageUrl)
    const newUserMessage: UserMessage = {
      sender: "user",
      message: message,
      imageUrl: imageUrl || undefined,
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
        setPreview("")
        setImage(null)
      } else {
        await saveMessageToChat(newUserMessage, chatId);
        setMessages(updatedMessages);
        setMessageInput("");
        setPreview("")
        setImage(null)
      }

      // Pass the updated messages (including the latest with the imageUrl) to OpenAI
      const newBotMessage = await makeOpenAICall(updatedMessages);
      await saveMessageToChat(newBotMessage, docRefId);
      setMessages([...updatedMessages, newBotMessage]);

      if (!chatId) {
        navigate(`/chats/${docRefId}`);
        await updateChats();
      }

      if (messages.length === 4) {
        const title = await makeOpenAISummaryCall(messages);
        await changeChatTitle(chatId, title);
        updateChats();
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
              handleImageSelect={handleImageSelect}
              preview={preview}
              handleSend={handleSend}
              onChange={(e) => setMessageInput(e.target.value)}
              onClick={sendMessagePressed}
          />
        </div>
      </div>
  );
};

export default withAuth(Chat);
