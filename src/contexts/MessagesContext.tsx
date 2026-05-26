import React, { createContext, useCallback, useContext, useState } from "react";

import { MOCK_MESSAGES } from "../mocks/messages";
import { CURRENT_USER } from "../mocks/users";
import type { Message } from "../types";

interface MessagesContextType {
  getMessages: (matchId: string) => Message[];
  sendMessage: (matchId: string, text: string) => void;
}

const MessagesContext = createContext<MessagesContextType | null>(null);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);

  const getMessages = useCallback(
    (matchId: string): Message[] => messages[matchId] ?? [],
    [messages]
  );

  const sendMessage = useCallback((matchId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      matchId,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderPhotoUrl: CURRENT_USER.photoUrl,
      text: trimmed,
      createdAt: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "message",
    };

    // Prepend so index 0 stays newest (matches inverted FlatList)
    setMessages((prev) => ({
      ...prev,
      [matchId]: [newMessage, ...(prev[matchId] ?? [])],
    }));
  }, []);

  return (
    <MessagesContext.Provider value={{ getMessages, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessagesContext(): MessagesContextType {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("useMessagesContext must be used within MessagesProvider");
  return ctx;
}
