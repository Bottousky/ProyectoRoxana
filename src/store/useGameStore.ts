import { create } from "zustand";
import type { JournalViewMode } from "@/game/types/events";
import type { PuzzleState } from "@/game/types/puzzle";

type GameStore = {
  activeDialogueId: string | null;
  activeSpeakerId: string | null;
  activeDialoguePresentation: "standard" | "portrait";
  activeDialogueBeatId: string | null;
  activeMemoryId: string | null;
  activeMemoryBeatId: string | null;
  activeMemorySource: "statue" | "office" | "classroom" | "portal" | "world" | null;
  currentRoomLabel: string;
  journalOpen: boolean;
  journalFocusEntryId: string | null;
  journalMode: JournalViewMode;
  unlockedJournalEntryIds: string[];
  unlockedJournalStagesByEntry: Record<string, string[]>;
  journalSpreadIndexByEntry: Record<string, number>;
  hasSeenJournalFirstOpen: boolean;
  prompt: string | null;
  activeMessageId: string | null;
  activePuzzleId: string | null;
  puzzleStates: Record<string, PuzzleState>;
  startDialogue: (
    dialogueId: string,
    speakerId: string,
    presentation?: "standard" | "portrait",
    beatId?: string,
  ) => void;
  completeDialogue: () => void;
  startMemory: (
    memoryId: string,
    source: "statue" | "office" | "classroom" | "portal" | "world",
    beatId?: string,
  ) => void;
  completeMemory: () => void;
  openJournal: (entryId?: string, mode?: JournalViewMode) => void;
  closeJournal: () => void;
  toggleJournal: () => void;
  setJournalMode: (mode: JournalViewMode) => void;
  unlockJournalEntry: (entryId: string) => void;
  unlockJournalStage: (entryId: string, stageId: string) => void;
  setJournalSpreadIndex: (entryId: string, spreadIndex: number) => void;
  markJournalFirstOpenSeen: () => void;
  setPuzzleState: (puzzleId: string, state: PuzzleState) => void;
  setPrompt: (prompt: string | null) => void;
  setRoomLabel: (label: string) => void;
  showMessage: (messageId: string) => void;
  clearMessage: () => void;
  showPuzzle: (puzzleId: string) => void;
  clearPuzzle: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  activeDialogueId: null,
  activeSpeakerId: null,
  activeDialoguePresentation: "standard",
  activeDialogueBeatId: null,
  activeMemoryId: null,
  activeMemoryBeatId: null,
  activeMemorySource: null,
  currentRoomLabel: "Escuela - Recepcion",
  journalOpen: false,
  journalFocusEntryId: null,
  journalMode: "simple",
  unlockedJournalEntryIds: [],
  unlockedJournalStagesByEntry: {},
  journalSpreadIndexByEntry: {},
  hasSeenJournalFirstOpen: false,
  prompt: null,
  activeMessageId: null,
  activePuzzleId: null,
  puzzleStates: {},
  startDialogue: (dialogueId, speakerId, presentation = "standard", beatId) =>
    set({
      activeDialogueId: dialogueId,
      activeSpeakerId: speakerId,
      activeDialoguePresentation: presentation,
      activeDialogueBeatId: beatId ?? null,
      journalOpen: false,
      journalFocusEntryId: null,
      prompt: null,
      activeMessageId: null,
      activeMemoryId: null,
      activeMemoryBeatId: null,
      activeMemorySource: null,
    }),
  completeDialogue: () =>
    set({
      activeDialogueId: null,
      activeSpeakerId: null,
      activeDialoguePresentation: "standard",
      activeDialogueBeatId: null,
    }),
  startMemory: (memoryId, source, beatId) =>
    set({
      activeMemoryId: memoryId,
      activeMemoryBeatId: beatId ?? null,
      activeMemorySource: source,
      activeDialogueId: null,
      activeSpeakerId: null,
      activeDialoguePresentation: "standard",
      activeDialogueBeatId: null,
      journalOpen: false,
      journalFocusEntryId: null,
      prompt: null,
      activeMessageId: null,
    }),
  completeMemory: () =>
    set({
      activeMemoryId: null,
      activeMemoryBeatId: null,
      activeMemorySource: null,
    }),
  openJournal: (entryId, mode = "simple") =>
    set({
      journalOpen: true,
      journalFocusEntryId: entryId ?? null,
      journalMode: mode,
      activeMessageId: null,
    }),
  closeJournal: () =>
    set({
      journalOpen: false,
      journalFocusEntryId: null,
    }),
  toggleJournal: () =>
    set((state) => ({
      journalOpen: !state.journalOpen,
      journalFocusEntryId: null,
      activeMessageId: state.journalOpen ? state.activeMessageId : null,
    })),
  setJournalMode: (mode) => set({ journalMode: mode }),
  unlockJournalEntry: (entryId) =>
    set((state) => {
      if (state.unlockedJournalEntryIds.includes(entryId)) {
        return state;
      }

      return {
        unlockedJournalEntryIds: [...state.unlockedJournalEntryIds, entryId],
      };
    }),
  unlockJournalStage: (entryId, stageId) =>
    set((state) => {
      const stages = state.unlockedJournalStagesByEntry[entryId] ?? [];
      if (stages.includes(stageId)) {
        return state;
      }

      return {
        unlockedJournalStagesByEntry: {
          ...state.unlockedJournalStagesByEntry,
          [entryId]: [...stages, stageId],
        },
      };
    }),
  setJournalSpreadIndex: (entryId, spreadIndex) =>
    set((state) => ({
      journalSpreadIndexByEntry: {
        ...state.journalSpreadIndexByEntry,
        [entryId]: spreadIndex,
      },
    })),
  markJournalFirstOpenSeen: () => set({ hasSeenJournalFirstOpen: true }),
  setPuzzleState: (puzzleId, puzzleState) =>
    set((state) => ({
      puzzleStates: {
        ...state.puzzleStates,
        [puzzleId]: puzzleState,
      },
    })),
  setPrompt: (prompt) => set({ prompt }),
  setRoomLabel: (label) => set({ currentRoomLabel: label }),
  showMessage: (messageId) =>
    set({
      activeMessageId: messageId,
      activePuzzleId: null,
      journalOpen: false,
      journalFocusEntryId: null,
    }),
  clearMessage: () => set({ activeMessageId: null }),
  showPuzzle: (puzzleId) =>
    set({
      activePuzzleId: puzzleId,
      activeMessageId: null,
      journalOpen: false,
      journalFocusEntryId: null,
    }),
  clearPuzzle: () => set({ activePuzzleId: null }),
}));
