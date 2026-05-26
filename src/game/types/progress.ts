import type { PuzzleState } from "@/game/types/puzzle";

export type ProgressMilestone =
  | "new"
  | "bitacora_found"
  | "electronics_entered"
  | "closed_circuit_completed"
  | "demo_finished";

export type PlayerProgress = {
  playerId: string;
  milestone: ProgressMilestone;
  completedScenes: string[];
  completedNarrativeBeats: string[];
  visitedRoomIds: string[];
  unlockedJournalEntries: string[];
  unlockedJournalStagesByEntry: Record<string, string[]>;
  completedPuzzles: string[];
  puzzleStates: Record<string, PuzzleState>;
  diagnosticKnowledge: string[];
  recoveredWorldItems: string[];
  lastRoomId: string | null;
};

export const createInitialProgress = (): PlayerProgress => ({
  playerId: "local-player",
  milestone: "new",
  completedScenes: [],
  completedNarrativeBeats: [],
  visitedRoomIds: [],
  unlockedJournalEntries: [],
  unlockedJournalStagesByEntry: {},
  completedPuzzles: [],
  puzzleStates: {},
  diagnosticKnowledge: [],
  recoveredWorldItems: [],
  lastRoomId: null,
});
