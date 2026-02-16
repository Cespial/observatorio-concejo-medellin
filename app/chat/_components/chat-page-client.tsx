"use client";

import { useState, useCallback } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { SuggestedQuestions } from "./suggested-questions";
import { ContextSidebar } from "./context-sidebar";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatPageClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSend = useCallback(
    async (overrideInput?: string) => {
      const text = (overrideInput ?? input).trim();
      if (!text || isLoading) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const history = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorText =
            data.error || "Error al comunicarse con el asistente.";
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              role: "assistant",
              content: `Lo siento, ocurrió un error: ${errorText}. Por favor intenta de nuevo.`,
            },
          ]);
          return;
        }

        const assistantText =
          data.content?.[0]?.text ??
          "Lo siento, no pude generar una respuesta. Intenta de nuevo.";

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: assistantText,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content:
              "No fue posible conectar con el servidor. Verifica tu conexión e intenta de nuevo.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleSelectQuestion = useCallback(
    (question: string) => {
      handleSend(question);
    },
    [handleSend]
  );

  return (
    <div className="flex h-full">
      {/* Chat area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Messages area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-1 flex-col">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <SuggestedQuestions onSelect={handleSelectQuestion} />
            </div>
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}
        </div>

        {/* Input area */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          disabled={isLoading}
        />
      </div>

      {/* Context sidebar - hidden on mobile */}
      <div className="hidden lg:flex">
        <ContextSidebar
          messages={messages}
          isOpen={showSidebar}
          onToggle={() => setShowSidebar((prev) => !prev)}
        />
      </div>
    </div>
  );
}
