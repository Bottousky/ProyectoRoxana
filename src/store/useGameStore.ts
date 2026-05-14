import { create } from "zustand";

type GameStore = {
  activeDialogueId: string | null;
  activeSpeakerId: string | null;
  journalOpen: boolean;
  prompt: string | null;
  startDialogue: (dialogueId: string, speakerId: string) => void;
  completeDialogue: () => void;
  toggleJournal: () => void;
  setPrompt: (prompt: string | null) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  activeDialogueId: null,
  activeSpeakerId: null,
  journalOpen: false,
  prompt: null,
  startDialogue: (dialogueId, speakerId) =>
    set({
      activeDialogueId: dialogueId,
      activeSpeakerId: speakerId,
      journalOpen: false,
      prompt: null,
    }),
  completeDialogue: () =>
    set({
      activeDialogueId: null,
      activeSpeakerId: null,
    }),
  toggleJournal: () => set((state) => ({ journalOpen: !state.journalOpen })),
  setPrompt: (prompt) => set({ prompt }),
}));
