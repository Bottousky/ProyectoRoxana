import type { PuzzleData, PuzzleState } from "@/game/types/puzzle";

export type ClosedCircuitRuntimeState = {
  switchClosed: boolean;
  puzzleState: PuzzleState;
};

export function createClosedCircuitState(): ClosedCircuitRuntimeState {
  return {
    switchClosed: false,
    puzzleState: "idle",
  };
}

export function toggleCircuitSwitch(
  state: ClosedCircuitRuntimeState,
): ClosedCircuitRuntimeState {
  return {
    switchClosed: !state.switchClosed,
    puzzleState: "attempted",
  };
}

export function testClosedCircuit(
  puzzle: PuzzleData,
  state: ClosedCircuitRuntimeState,
): ClosedCircuitRuntimeState {
  const hasRequiredShape =
    puzzle.type === "closed_circuit" &&
    puzzle.successCondition.type === "closed_path" &&
    Boolean(puzzle.successCondition.sourceId) &&
    Boolean(puzzle.successCondition.loadId);

  return {
    ...state,
    puzzleState: hasRequiredShape && state.switchClosed ? "complete" : "incomplete",
  };
}
