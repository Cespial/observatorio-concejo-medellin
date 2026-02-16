"use client";

import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-institucional/10">
          <Bot className="h-8 w-8 text-institucional" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Asistente del Observatorio</h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-md">
            Pregunta sobre indicadores, datos socioeconómicos e iniciativas
            legislativas de Medellín. Estoy aquí para ayudarte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-1 py-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
