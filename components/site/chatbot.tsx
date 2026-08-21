"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { getChatbotReply, type ChatLink } from "@/lib/chatbot";
import { useChatbot } from "@/lib/chatbot-context";

interface Message {
  role: "user" | "bot";
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
}

const WELCOME: Message = {
  role: "bot",
  text: "Ciao! Sono l'assistente MARÌ 🍋 Chiedimi di prodotti, materie prime, formati, conservazione, spedizioni o ordini.",
  suggestions: ["Che prodotti avete?", "Come si conservano i biscotti Regina?", "Come ordino?"],
};

export function Chatbot() {
  const { isOpen, toggleChatbot, closeChatbot, pendingQuery, consumePendingQuery } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = getChatbotReply(trimmed);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: reply.text, links: reply.links, suggestions: reply.suggestions },
    ]);
    setInput("");
  }

  useEffect(() => {
    if (!isOpen || !pendingQuery) return;
    // Invia automaticamente la domanda pre-compilata (es. da "Chiedi info"
    // su un prodotto) non appena il pannello si apre.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    send(pendingQuery);
    consumePendingQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pendingQuery]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleChatbot}
        aria-label={isOpen ? "Chiudi assistente MARÌ" : "Apri assistente MARÌ"}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-oro/40 bg-notte text-oro shadow-[0_10px_30px_rgba(10,47,82,0.35)] transition-transform hover:scale-105 sm:bottom-28 sm:right-8"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[9.5rem] right-6 z-50 flex h-[28rem] w-[92vw] max-w-sm flex-col overflow-hidden rounded-[1.5rem] bg-avorio shadow-2xl sm:bottom-[11rem] sm:right-8"
          >
            <div className="flex items-center justify-between gap-2.5 border-b border-notte/10 bg-notte px-5 py-4 text-avorio">
              <span className="flex items-center gap-2.5">
                <Bot className="h-5 w-5 text-oro" />
                <p className="font-display text-lg italic">Assistente MARÌ</p>
              </span>
              <button
                type="button"
                onClick={closeChatbot}
                aria-label="Chiudi"
                className="text-avorio/70 hover:text-avorio"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-notte px-4 py-2.5 text-sm text-avorio"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm bg-sabbia/40 px-4 py-2.5 text-sm text-testo"
                    }
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.links.map((l) => (
                          <a
                            key={l.href + l.label}
                            href={l.href}
                            target={l.external ? "_blank" : undefined}
                            rel={l.external ? "noopener noreferrer" : undefined}
                            onClick={() => !l.external && closeChatbot()}
                            className="rounded-full bg-notte px-3 py-1.5 text-xs font-medium text-avorio transition-colors hover:bg-mari"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {m.suggestions && m.suggestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.suggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => send(s)}
                            className="rounded-full border border-notte/20 px-3 py-1.5 text-xs text-notte transition-colors hover:border-notte"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-notte/10 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi una domanda…"
                className="w-full flex-1 rounded-full border border-notte/20 bg-transparent px-4 py-2 text-sm text-notte outline-none placeholder:text-testo/40 focus:border-oro"
              />
              <button
                type="submit"
                aria-label="Invia"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-notte text-avorio transition-colors hover:bg-mari"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
