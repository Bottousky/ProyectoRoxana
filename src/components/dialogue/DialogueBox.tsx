"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import roxanaIntro from "@/content/dialogues/roxana-intro.json";
import { gameEvents } from "@/game/systems/eventBus";
import type { DialogueContent } from "@/game/types/dialogue";
import { useGameStore } from "@/store/useGameStore";

const dialogueLibrary: Record<string, DialogueContent> = {
  [roxanaIntro.id]: roxanaIntro,
};

export function DialogueBox() {
  const activeDialogueId = useGameStore((state) => state.activeDialogueId);
  const completeDialogue = useGameStore((state) => state.completeDialogue);
  const [progress, setProgress] = useState<{
    dialogueId: string | null;
    lineIndex: number;
  }>({ dialogueId: null, lineIndex: 0 });

  const dialogue = useMemo(() => {
    return activeDialogueId ? dialogueLibrary[activeDialogueId] : null;
  }, [activeDialogueId]);

  const lineIndex =
    dialogue && progress.dialogueId === activeDialogueId
      ? progress.lineIndex
      : 0;
  const line = dialogue?.lines[lineIndex] ?? "";
  const isLastLine = dialogue ? lineIndex >= dialogue.lines.length - 1 : false;

  const closeDialogue = useCallback(() => {
    if (!dialogue) {
      return;
    }

    completeDialogue();
    setProgress({ dialogueId: null, lineIndex: 0 });
    gameEvents.emit("dialogue:complete", { dialogueId: dialogue.id });
  }, [completeDialogue, dialogue]);

  const advanceDialogue = useCallback(() => {
    if (!dialogue) {
      return;
    }

    if (isLastLine) {
      closeDialogue();
      return;
    }

    setProgress({
      dialogueId: dialogue.id,
      lineIndex: lineIndex + 1,
    });
  }, [closeDialogue, dialogue, isLastLine, lineIndex]);

  useEffect(() => {
    if (!dialogue) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const isAdvanceKey =
        event.key === "Enter" ||
        event.key === " " ||
        event.key.toLowerCase() === "e";
      const isBackKey = event.key === "Escape" || event.key === "Backspace";

      if (isAdvanceKey) {
        event.preventDefault();
        advanceDialogue();
      }

      if (isBackKey) {
        event.preventDefault();
        closeDialogue();
      }
    }

    const offInteract = gameEvents.on("input:interact", advanceDialogue);
    const offBack = gameEvents.on("input:back", closeDialogue);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      offInteract();
      offBack();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [advanceDialogue, closeDialogue, dialogue]);

  if (!dialogue) {
    return null;
  }

  return (
    <div className="absolute inset-x-3 bottom-3 z-30 rounded-lg border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/95 p-4 text-[var(--roxana-text)] shadow-2xl shadow-black/50 backdrop-blur sm:inset-x-8 sm:bottom-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--roxana-accent)]">
            {dialogue.speaker}
          </p>
          <h2 className="text-base font-semibold leading-6 sm:text-lg">
            {dialogue.title}
          </h2>
        </div>
        <button
          type="button"
          className="rounded-md border border-[var(--roxana-border)] px-3 py-2 text-sm font-semibold text-[var(--roxana-muted)] transition hover:bg-[var(--roxana-panel-strong)] hover:text-[var(--roxana-text)]"
          onClick={closeDialogue}
        >
          Cerrar
        </button>
      </div>

      <p className="min-h-16 text-base leading-7 sm:text-lg">{line}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-[var(--roxana-muted)]">
          {lineIndex + 1} / {dialogue.lines.length}
        </span>
        <button
          type="button"
          className="rounded-md bg-[var(--roxana-accent)] px-4 py-2 text-sm font-bold text-[#102126] transition hover:brightness-110"
          onClick={advanceDialogue}
        >
          {isLastLine ? "Terminar" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
