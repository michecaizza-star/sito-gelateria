"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface ChatbotContextValue {
  isOpen: boolean;
  pendingQuery: string | null;
  openChatbot: (query?: string) => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  consumePendingQuery: () => void;
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  const openChatbot = useCallback((query?: string) => {
    setIsOpen(true);
    if (query) setPendingQuery(query);
  }, []);

  const closeChatbot = useCallback(() => setIsOpen(false), []);
  const toggleChatbot = useCallback(() => setIsOpen((v) => !v), []);
  const consumePendingQuery = useCallback(() => setPendingQuery(null), []);

  const value: ChatbotContextValue = {
    isOpen,
    pendingQuery,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    consumePendingQuery,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used within a ChatbotProvider");
  return ctx;
}
