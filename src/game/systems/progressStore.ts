import {
  createInitialProgress,
  type PlayerProgress,
  type ProgressMilestone,
} from "@/game/types/progress";
import type { PuzzleState } from "@/game/types/puzzle";

const STORAGE_KEY = "roxana:mvp-progress";

const canUseStorage = () => typeof window !== "undefined" && window.localStorage;

export function loadProgress(): PlayerProgress {
  if (!canUseStorage()) {
    return createInitialProgress();
  }

  const rawProgress = window.localStorage.getItem(STORAGE_KEY);
  if (!rawProgress) {
    return createInitialProgress();
  }

  try {
    return {
      ...createInitialProgress(),
      ...(JSON.parse(rawProgress) as Partial<PlayerProgress>),
    };
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: PlayerProgress) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateProgress(
  updater: (progress: PlayerProgress) => PlayerProgress,
) {
  const nextProgress = updater(loadProgress());
  saveProgress(nextProgress);
  return nextProgress;
}

export function unlockJournalEntry(entryId: string) {
  return updateProgress((progress) => {
    if (progress.unlockedJournalEntries.includes(entryId)) {
      return progress;
    }

    return {
      ...progress,
      unlockedJournalEntries: [...progress.unlockedJournalEntries, entryId],
    };
  });
}

export function setProgressMilestone(milestone: ProgressMilestone) {
  return updateProgress((progress) => ({
    ...progress,
    milestone,
  }));
}

export function unlockJournalStage(entryId: string, stageId: string) {
  return updateProgress((progress) => {
    const stages = progress.unlockedJournalStagesByEntry[entryId] ?? [];
    if (stages.includes(stageId)) {
      return progress;
    }

    return {
      ...progress,
      unlockedJournalStagesByEntry: {
        ...progress.unlockedJournalStagesByEntry,
        [entryId]: [...stages, stageId],
      },
    };
  });
}

export function setLastRoom(lastRoomId: string) {
  return updateProgress((progress) => ({
    ...progress,
    lastRoomId,
  }));
}

export function completeNarrativeBeat(beatId: string) {
  return updateProgress((progress) => {
    if (progress.completedNarrativeBeats.includes(beatId)) {
      return progress;
    }

    return {
      ...progress,
      completedNarrativeBeats: [...progress.completedNarrativeBeats, beatId],
    };
  });
}

export function markRoomVisited(roomId: string) {
  return updateProgress((progress) => {
    if (progress.visitedRoomIds.includes(roomId)) {
      return progress;
    }

    return {
      ...progress,
      visitedRoomIds: [...progress.visitedRoomIds, roomId],
    };
  });
}

export function hasCompletedNarrativeBeat(beatId: string) {
  return loadProgress().completedNarrativeBeats.includes(beatId);
}

export function hasVisitedRoom(roomId: string) {
  return loadProgress().visitedRoomIds.includes(roomId);
}

export function setPuzzleState(puzzleId: string, state: PuzzleState) {
  return updateProgress((progress) => ({
    ...progress,
    completedPuzzles:
      state === "complete" && !progress.completedPuzzles.includes(puzzleId)
        ? [...progress.completedPuzzles, puzzleId]
        : progress.completedPuzzles,
    puzzleStates: {
      ...progress.puzzleStates,
      [puzzleId]: state,
    },
  }));
}

export function recoverWorldItem(itemId: string) {
  return updateProgress((progress) => {
    if (progress.recoveredWorldItems.includes(itemId)) {
      return progress;
    }

    return {
      ...progress,
      recoveredWorldItems: [...progress.recoveredWorldItems, itemId],
    };
  });
}

export function hasRecoveredWorldItem(itemId: string) {
  return loadProgress().recoveredWorldItems.includes(itemId);
}
