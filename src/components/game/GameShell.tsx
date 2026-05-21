"use client";

import { useEffect } from "react";
import { DialogueBox } from "@/components/dialogue/DialogueBox";
import { HudOverlay } from "@/components/hud/HudOverlay";
import { MessagePanel } from "@/components/hud/MessagePanel";
import { MemoryPanelOverlay } from "@/components/memory/MemoryPanelOverlay";
import { JournalPanel } from "@/components/journal/JournalPanel";
import {
  installAnalyticsInspector,
  trackAnalyticsEvent,
} from "@/game/systems/analytics";
import { gameEvents } from "@/game/systems/eventBus";
import {
  completeNarrativeBeat,
  loadProgress,
  markRoomVisited,
  unlockJournalStage as persistJournalStage,
  setPuzzleState as persistPuzzleState,
  unlockJournalEntry as persistJournalEntry,
} from "@/game/systems/progressStore";
import { useGameStore } from "@/store/useGameStore";
import { MobileControls } from "./MobileControls";
import { PhaserGame } from "./PhaserGame";

export function GameShell() {
  const activeDialogueId = useGameStore((state) => state.activeDialogueId);
  const activeMemoryId = useGameStore((state) => state.activeMemoryId);
  const activeMessageId = useGameStore((state) => state.activeMessageId);
  const journalOpen = useGameStore((state) => state.journalOpen);
  const startDialogue = useGameStore((state) => state.startDialogue);
  const startMemory = useGameStore((state) => state.startMemory);
  const completeMemory = useGameStore((state) => state.completeMemory);
  const setPrompt = useGameStore((state) => state.setPrompt);
  const setRoomLabel = useGameStore((state) => state.setRoomLabel);
  const openJournal = useGameStore((state) => state.openJournal);
  const closeJournal = useGameStore((state) => state.closeJournal);
  const unlockJournalEntry = useGameStore((state) => state.unlockJournalEntry);
  const unlockJournalStage = useGameStore((state) => state.unlockJournalStage);
  const setPuzzleState = useGameStore((state) => state.setPuzzleState);
  const showMessage = useGameStore((state) => state.showMessage);

  useEffect(() => {
    installAnalyticsInspector();
    const progress = loadProgress();
    progress.unlockedJournalEntries.forEach((entryId) => {
      unlockJournalEntry(entryId);
    });
    Object.entries(progress.unlockedJournalStagesByEntry).forEach(
      ([entryId, stageIds]) => {
        stageIds.forEach((stageId) => {
          unlockJournalStage(entryId, stageId);
        });
      },
    );
    trackAnalyticsEvent({ eventName: "started_game" });

    const offDialogue = gameEvents.on("dialogue:start", (payload) => {
      startDialogue(
        payload.dialogueId,
        payload.speakerId,
        payload.presentation,
        payload.beatId,
      );
      if (payload.presentation === "portrait") {
        trackAnalyticsEvent({
          eventName: "started_portrait_dialogue",
          dialogueId: payload.dialogueId,
          beatId: payload.beatId,
        });
      }
    });

    const offPrompt = gameEvents.on("hud:prompt", (payload) => {
      setPrompt(payload?.message ?? null);
    });

    const offJournalOpen = gameEvents.on("journal:open", (payload) => {
      openJournal(payload.entryId, payload.mode);
      trackAnalyticsEvent({
        eventName: "opened_bitacora",
        entryId: payload.entryId,
        source: payload.mode,
      });
    });

    const offMessageShow = gameEvents.on("message:show", (payload) => {
      showMessage(payload.messageId);
    });

    const offJournalUnlocked = gameEvents.on(
      "journal:entry-unlocked",
      (payload) => {
        unlockJournalEntry(payload.entryId);
        persistJournalEntry(payload.entryId);
        if (payload.beatId) {
          completeNarrativeBeat(payload.beatId);
        }
      },
    );

    const offJournalUpdated = gameEvents.on("journal:entry-updated", (payload) => {
      unlockJournalStage(payload.entryId, payload.stageId);
      persistJournalStage(payload.entryId, payload.stageId);
      gameEvents.emit("journal:stage-revealed", {
        entryId: payload.entryId,
        stageId: payload.stageId,
      });
      trackAnalyticsEvent({
        eventName: "journal_stage_revealed",
        entryId: payload.entryId,
        source: payload.stageId,
      });
      if (payload.beatId) {
        completeNarrativeBeat(payload.beatId);
      }
    });

    const offRoomEntered = gameEvents.on("room:entered", (payload) => {
      markRoomVisited(payload.roomId);
      setRoomLabel(roomLabelFor(payload.roomId));
    });

    const offBeatCompleted = gameEvents.on(
      "narrative:beat-completed",
      (payload) => {
        completeNarrativeBeat(payload.beatId);
      },
    );

    const offMemoryStart = gameEvents.on("memory:start", (payload) => {
      startMemory(payload.memoryId, payload.source, payload.beatId);
      trackAnalyticsEvent({
        eventName: "started_memory_sequence",
        memoryId: payload.memoryId,
        beatId: payload.beatId,
        source: payload.source,
      });
    });

    const offMemoryComplete = gameEvents.on("memory:complete", (payload) => {
      completeMemory();
      if (payload.beatId) {
        completeNarrativeBeat(payload.beatId);
      }
      if (payload.memoryId === "roxana_office_discovery") {
        gameEvents.emit("journal:entry-unlocked", {
          entryId: "central_bitacora_vacia",
          source: "story",
          beatId: "hub_bitacora_found",
        });
        gameEvents.emit("journal:open", {
          entryId: "central_bitacora_vacia",
          mode: "simple",
        });
      }
      if (payload.memoryId === "ohmdal_preview") {
        gameEvents.emit("journal:entry-unlocked", {
          entryId: "ohmdal_closed_circuit",
          source: "story",
          beatId: "ohmdal_preview_memory_seen",
        });
        gameEvents.emit("journal:entry-updated", {
          entryId: "ohmdal_closed_circuit",
          stageId: "first_impression",
          source: "story",
          beatId: "ohmdal_preview_memory_seen",
        });
        gameEvents.emit("dialogue:start", {
          dialogueId: "ohmdal_preview_response",
          speakerId: "ohm_automaton",
          presentation: "portrait",
          beatId: "ohmdal_automaton_after_preview",
        });
      }
      trackAnalyticsEvent({
        eventName: "completed_memory_sequence",
        memoryId: payload.memoryId,
        beatId: payload.beatId,
        metadata: { skipped: payload.skipped },
      });
    });

    const offPuzzleState = gameEvents.on("puzzle:state-change", (payload) => {
      setPuzzleState(payload.puzzleId, payload.state);
      persistPuzzleState(payload.puzzleId, payload.state);
    });

    const offPuzzleComplete = gameEvents.on("puzzle:complete", (payload) => {
      setPuzzleState(payload.puzzleId, "complete");
      persistPuzzleState(payload.puzzleId, "complete");
      payload.unlockedJournalEntryIds.forEach((entryId) => {
        unlockJournalEntry(entryId);
        persistJournalEntry(entryId);
      });
      if (payload.puzzleId === "closed_circuit_001") {
        gameEvents.emit("journal:entry-updated", {
          entryId: "ohmdal_closed_circuit",
          stageId: "post_restoration",
          source: "puzzle",
          beatId: "ohmdal_first_puzzle_handoff",
        });
      }
    });

    const offAnalytics = gameEvents.on("analytics:track", (payload) => {
      trackAnalyticsEvent(payload);
    });

    return () => {
      offDialogue();
      offPrompt();
      offJournalOpen();
      offMessageShow();
      offJournalUnlocked();
      offJournalUpdated();
      offRoomEntered();
      offBeatCompleted();
      offMemoryStart();
      offMemoryComplete();
      offPuzzleState();
      offPuzzleComplete();
      offAnalytics();
    };
  }, [
    openJournal,
    completeMemory,
    setPrompt,
    setRoomLabel,
    setPuzzleState,
    showMessage,
    startDialogue,
    startMemory,
    unlockJournalEntry,
    unlockJournalStage,
  ]);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      const isJournalKey = key === "b" || key === "j";
      const isBackKey = event.key === "Escape" || event.key === "Backspace";

      if (isJournalKey) {
        event.preventDefault();
        if (journalOpen) {
          closeJournal();
          gameEvents.emit("journal:close");
          return;
        }

        gameEvents.emit("journal:open", {
          mode: "simple",
        });
        return;
      }

      if (
        isBackKey &&
        !journalOpen &&
        !activeDialogueId &&
        !activeMemoryId &&
        !activeMessageId
      ) {
        gameEvents.emit("input:back");
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [activeDialogueId, activeMemoryId, activeMessageId, closeJournal, journalOpen]);

  useEffect(() => {
    gameEvents.emit("ui:controls-lock", {
      locked: Boolean(
        activeDialogueId || activeMemoryId || activeMessageId || journalOpen,
      ),
    });
  }, [activeDialogueId, activeMemoryId, activeMessageId, journalOpen]);

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
          <MemoryPanelOverlay />
          <JournalPanel />
          <MessagePanel />
        </div>
      </section>
    </div>
  );
}

function roomLabelFor(roomId: string) {
  switch (roomId) {
    case "roxana_office":
      return "Escuela - Despacho de Roxana";
    case "electronics_classroom":
      return "Escuela - Aula de Electronica";
    case "ohmdal_threshold":
      return "Ohmdal - Umbral";
    case "roxana_library_hub":
    default:
      return "Escuela - Sala principal";
  }
}
