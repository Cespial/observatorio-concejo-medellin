"use client";

import { Bot, User } from "lucide-react";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-institucional text-white"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      <div
        className={cn(
          "flex flex-col gap-1 max-w-[80%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <span className="text-xs text-muted-foreground">
          {isUser ? "Tú" : "Asistente IA"}
        </span>
        <div
          className={cn(
            "rounded-lg px-4 py-2.5",
            isUser
              ? "bg-institucional text-white"
              : "bg-muted"
          )}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          ) : (
            <MarkdownRenderer
              content={content}
              className="text-sm [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}
