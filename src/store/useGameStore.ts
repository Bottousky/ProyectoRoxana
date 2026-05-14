import { create } from "zustand";

type GameStore = {
  activeDialogueId: string | null;
  activeSpeakerId: string | null;
  journalOpen: boolean;
  journalFocusEntryId: string | null;
  prompt: string | null;
  activeMessageId: string | null;
  startDialogue: (dialogueId: string, speakerId: string) => void;
  completeDialogue: () => void;
  openJournal: (entryId?: string) => void;
  closeJournal: () => void;
  toggleJournal: () => void;
  setPrompt: (prompt: string | null) => void;
  showMessage: (messageId: string) => void;
  clearMessage: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  activeDialogueId: null,
  activeSpeakerId: null,
  journalOpen: false,
  journalFocusEntryId: null,
  prompt: null,
  activeMessageId: null,
  startDialogue: (dialogueId, speakerId) =>
    set({
      activeDialogueId: dialogueId,
      activeSpeakerId: speakerId,
      journalOpen: false,
      journalFocusEntryId: null,
      prompt: null,
      activeMessageId: null,
    }),
  completeDialogue: () =>
    set({
      activeDialogueId: null,
      activeSpeakerId: null,
    }),
  openJournal: (entryId) =>
    set({
      journalOpen: true,
      journalFocusEntryId: entryId ?? null,
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
  setPrompt: (prompt) => set({ prompt }),
  showMessage: (messageId) =>
    set({
      activeMessageId: messageId,
      journalOpen: false,
      journalFocusEntryId: null,
    }),
  clearMessage: () => set({ activeMessageId: null }),
}));
