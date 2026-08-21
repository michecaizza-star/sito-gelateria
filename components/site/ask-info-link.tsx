"use client";

import { useChatbot } from "@/lib/chatbot-context";
import { cn } from "@/lib/utils";

export function AskInfoLink({
  productName,
  className,
}: {
  productName: string;
  className?: string;
}) {
  const { openChatbot } = useChatbot();

  return (
    <button
      type="button"
      onClick={() => openChatbot(`Dimmi di più su ${productName}`)}
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-display italic text-notte/70 transition-colors hover:text-mari",
        className
      )}
    >
      Chiedi info
      <span className="transition-transform group-hover/link:translate-x-1">→</span>
    </button>
  );
}
