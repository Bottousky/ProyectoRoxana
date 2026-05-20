export type DirectionVector = {
  x: number;
  y: number;
};

export type JournalViewMode = "simple" | "technical";

export type DialoguePresentation = "standard" | "portrait";

export type NarrativeBeatKind =
  | "dialogue"
  | "message"
  | "memory"
  | "journal_unlock"
  | "room_transition"
  | "puzzle_handoff";

export type SpikeVisualState = "abandoned" | "recognizable" | "recomposed";

export type RoxanaSceneId =
  | "boot"
  | "preload"
  | "hub"
  | "electronics_classroom"
  | "topdown_spike"
  | "voxel_spike"
  | "electronics_threshold"
  | "electronics_puzzle_closed_circuit";

export type RoxanaGameEvents = {
  "dialogue:start": {
    dialogueId: string;
    speakerId: string;
    presentation?: DialoguePresentation;
    beatId?: string;
  };
  "dialogue:complete": {
    dialogueId: string;
    beatId?: string;
  };
  "hud:prompt": {
    message: string;
  } | null;
  "input:virtual-direction": DirectionVector;
  "input:interact": void;
  "input:back": void;
  "interaction:start": {
    id: string;
    kind: "dialogue" | "journal" | "blocked_gate" | "inspect" | "puzzle";
  };
  "journal:open": {
    entryId?: string;
    mode?: JournalViewMode;
  };
  "journal:entry-unlocked": {
    entryId: string;
    source: "story" | "puzzle" | "diagnostic";
    beatId?: string;
  };
  "message:show": {
    messageId: string;
  };
  "room:entered": {
    roomId: string;
    sourceRoomId?: string;
    firstVisit: boolean;
  };
  "narrative:beat-started": {
    beatId: string;
    kind: NarrativeBeatKind;
    roomId?: string;
  };
  "narrative:beat-completed": {
    beatId: string;
    roomId?: string;
  };
  "memory:start": {
    memoryId: string;
    beatId?: string;
    source: "statue" | "office" | "classroom" | "portal" | "world";
  };
  "memory:complete": {
    memoryId: string;
    beatId?: string;
    skipped: boolean;
  };
  "puzzle:start": {
    puzzleId: string;
    worldId: string;
  };
  "puzzle:state-change": {
    puzzleId: string;
    state: "idle" | "attempted" | "incomplete" | "complete";
  };
  "puzzle:complete": {
    puzzleId: string;
    unlockedJournalEntryIds: string[];
  };
  "analytics:track": {
    eventName:
      | "started_game"
      | "entered_school"
      | "opened_roxana_office"
      | "found_bitacora"
      | "opened_bitacora"
      | "entered_electronics_room"
      | "started_puzzle_closed_circuit"
      | "failed_puzzle_closed_circuit"
      | "completed_puzzle_closed_circuit"
      | "opened_light_entry"
      | "opened_formal_entry"
      | "clicked_video"
      | "completed_optional_exercise"
      | "finished_demo"
      | "entered_electronics_classroom"
      | "viewed_ohmdal_preview"
      | "started_portrait_dialogue"
      | "completed_portrait_dialogue"
      | "started_memory_sequence"
      | "completed_memory_sequence"
      | "started_puzzle_after_narrative_bridge";
    roomId?: string;
    puzzleId?: string;
    entryId?: string;
    beatId?: string;
    dialogueId?: string;
    memoryId?: string;
    source?: string;
    metadata?: Record<string, string | number | boolean | null>;
  };
  "spike:visual-state": {
    state: SpikeVisualState;
  };
  "ui:controls-lock": {
    locked: boolean;
  };
  "scene:ready": {
    scene: RoxanaSceneId;
  };
};
