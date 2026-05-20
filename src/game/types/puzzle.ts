export type PuzzleState = "idle" | "attempted" | "incomplete" | "complete";

export type CircuitComponentType =
  | "source"
  | "conductor"
  | "switch"
  | "load"
  | "break"
  | "connector";

export type CircuitComponentState = "open" | "closed" | "powered" | "unpowered";

export type CircuitConnection = {
  from: string;
  to: string;
};

export type CircuitComponent = {
  id: string;
  type: CircuitComponentType;
  state?: CircuitComponentState;
  x: number;
  y: number;
  connections?: CircuitConnection[];
};

export type PuzzleFeedbackRule = {
  state: PuzzleState;
  messageId?: string;
  dialogueId?: string;
};

export type ClosedCircuitSuccessCondition = {
  type: "closed_path";
  sourceId: string;
  loadId: string;
};

export type PuzzleData = {
  id: string;
  worldId: string;
  type: "closed_circuit";
  title: string;
  conceptIds: string[];
  components: CircuitComponent[];
  initialState: PuzzleState;
  allowedActions: string[];
  feedbackRules: PuzzleFeedbackRule[];
  successCondition: ClosedCircuitSuccessCondition;
  unlockedJournalEntryIds: string[];
};
