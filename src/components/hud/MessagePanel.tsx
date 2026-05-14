"use client";

import { useEffect, useMemo } from "react";
import hubMessages from "@/content/messages/hub.json";
import { gameEvents } from "@/game/systems/eventBus";
import type { MessageContent } from "@/game/types/message";
import { useGameStore } from "@/store/useGameStore";

type MessageCollection = {
  messages: MessageContent[];
};

const messageData = hubMessages as MessageCollection;

export function MessagePanel() {
  const activeMessageId = useGameStore((state) => state.activeMessageId);
  const clearMessage = useGameStore((state) => state.clearMessage);

  const message = useMemo(() => {
    if (!activeMessageId) {
      return null;
    }

    return (
      messageData.messages.find((entry) => entry.id === activeMessageId) ?? null
    );
  }, [activeMessageId]);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeout = window.setTimeout(() => {
      clearMessage();
    }, 3400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [clearMessage, message]);

  useEffect(() => {
    if (!message) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const isAdvanceKey =
        event.key === "Enter" ||
        event.key === " " ||
        event.key.toLowerCase() === "e";
      const isBackKey = event.key === "Escape" || event.key === "Backspace";

      if (!isAdvanceKey && !isBackKey) {
        return;
      }

      event.preventDefault();
      clearMessage();
    }

    const offInteract = gameEvents.on("input:interact", clearMessage);
    const offBack = gameEvents.on("input:back", clearMessage);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      offInteract();
      offBack();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearMessage, message]);

  if (!message) {
    return null;
  }

  return (
    <aside className="pointer-events-none absolute inset-x-4 bottom-20 z-30 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/95 px-4 py-3 text-[var(--roxana-text)] shadow-xl backdrop-blur sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[20rem]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--roxana-accent)]">
        {message.title}
      </p>
      <p className="mt-1 text-sm leading-6 text-[var(--roxana-muted)]">
        {message.body}
      </p>
    </aside>
  );
}
