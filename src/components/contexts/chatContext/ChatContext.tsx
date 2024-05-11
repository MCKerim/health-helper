import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getChatsFromUID } from "../../../firebase";
import { auth } from "../../../firebase";

interface Chat {
  id: string;
  timestamp?: number;
}

interface ChatContextType {
  chats: Chat[];
  updateChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChats = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChats must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const updateChats = async () => {
    const fetchedChats = await getChatsFromUID(auth.currentUser?.uid);
    if (fetchedChats) {
      const sortedChats = fetchedChats.sort((a, b) => {
        return a.data.timestamp === null || a.data.timestamp === undefined
          ? 1
          : b.data.timestamp === null || b.data.timestamp === undefined
            ? -1
            : b.data.timestamp - a.data.timestamp;
      });
      setChats(sortedChats);
    }
  };

  return (
    <ChatContext.Provider value={{ chats, updateChats }}>
      {children}
    </ChatContext.Provider>
  );
};
