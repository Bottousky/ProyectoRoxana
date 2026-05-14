"use client";

import { useEffect } from "react";
import { DialogueBox } from "@/components/dialogue/DialogueBox";
import { HudOverlay } from "@/components/hud/HudOverlay";
import { MessagePanel } from "@/components/hud/MessagePanel";
import { JournalPanel } from "@/components/journal/JournalPanel";
import { gameEvents } from "@/game/systems/eventBus";
import { useGameStore } from "@/store/useGameStore";
import { MobileControls } from "./MobileControls";
import { PhaserGame } from "./PhaserGame";

export function GameShell() {
  const activeDialogueId = useGameStore((state) => state.activeDialogueId);
  const activeMessageId = useGameStore((state) => state.activeMessageId);
  const journalOpen = useGameStore((state) => state.journalOpen);
  const startDialogue = useGameStore((state) => state.startDialogue);
  const setPrompt = useGameStore((state) => state.setPrompt);
  const openJournal = useGameStore((state) => state.openJournal);
  const showMessage = useGameStore((state) => state.showMessage);

  useEffect(() => {
    const offDialogue = gameEvents.on("dialogue:start", (payload) => {
      startDialogue(payload.dialogueId, payload.speakerId);
    });

    const offPrompt = gameEvents.on("hud:prompt", (payload) => {
      setPrompt(payload?.message ?? null);
    });

    const offJournalOpen = gameEvents.on("journal:open", (payload) => {
      openJournal(payload.entryId);
    });

    const offMessageShow = gameEvents.on("message:show", (payload) => {
      showMessage(payload.messageId);
    });

    return () => {
      offDialogue();
      offPrompt();
      offJournalOpen();
      offMessageShow();
    };
  }, [openJournal, setPrompt, showMessage, startDialogue]);

  useEffect(() => {
    gameEvents.emit("ui:controls-lock", {
      locked: Boolean(activeDialogueId || activeMessageId || journalOpen),
    });
  }, [activeDialogueId, activeMessageId, journalOpen]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-5 sm:px-6">
      <section className="w-full max-w-6xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
              Proyecto Roxana
            </h1>
            <p className="text-sm leading-5 text-[var(--roxana-muted)]">
              Hub tecnico inicial: mover, interactuar y abrir bitacora.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-[var(--roxana-border)] bg-black shadow-2xl shadow-black/30">
          <div className="roxana-game-frame aspect-video w-full">
            <PhaserGame />
          </div>
          <HudOverlay />
          <MobileControls />
          <DialogueBox />
          <JournalPanel />
          <MessagePanel />
        </div>
      </section>
    </div>
  );
}
