"use client";

import { gameEvents } from "@/game/systems/eventBus";
import { useGameStore } from "@/store/useGameStore";

type PuzzleOption = {
  id: string;
  label: string;
  result: "fail" | "complete";
};

const PUZZLE_CONFIG: Record<
  string,
  { title: string; hint: string; options: PuzzleOption[] }
> = {
  ohmdal_ch1_puzzle_01: {
    title: "Nodo de Patio",
    hint: "Elegi el tramo que devuelve el pulso.",
    options: [
      { id: "p1_ok", label: "Cerrar retorno", result: "complete" },
      { id: "p1_bad", label: "Cortar salida", result: "fail" },
    ],
  },
  ohmdal_ch1_puzzle_02: {
    title: "Nodo de Taller",
    hint: "No todo material sostiene el mismo camino.",
    options: [
      { id: "p2_bad_1", label: "Madera", result: "fail" },
      { id: "p2_ok", label: "Cobre", result: "complete" },
      { id: "p2_bad_2", label: "Piedra", result: "fail" },
    ],
  },
  ohmdal_ch1_puzzle_03: {
    title: "Nodo de Plaza",
    hint: "El sistema despierta cuando completa ida y vuelta.",
    options: [
      { id: "p3_bad", label: "Solo salida", result: "fail" },
      { id: "p3_ok", label: "Ida + retorno", result: "complete" },
    ],
  },
};

export function OhmdalPuzzleOverlay() {
  const activePuzzleId = useGameStore((state) => state.activePuzzleId);
  const clearPuzzle = useGameStore((state) => state.clearPuzzle);
  if (!activePuzzleId) {
    return null;
  }

  const config = PUZZLE_CONFIG[activePuzzleId];
  if (!config) {
    return null;
  }

  return (
    <div className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center bg-black/55 px-4">
      <section className="w-full max-w-md rounded-lg border border-[var(--roxana-border)] bg-[var(--roxana-surface)] p-4 text-[var(--roxana-foreground)] shadow-xl">
        <h2 className="text-base font-semibold">{config.title}</h2>
        <p className="mt-2 text-sm text-[var(--roxana-muted)]">{config.hint}</p>
        <div className="mt-4 grid gap-2">
          {config.options.map((option) => (
            <button
              className="rounded-md border border-[var(--roxana-border)] bg-black/30 px-3 py-2 text-left text-sm hover:bg-black/45"
              key={option.id}
              onClick={() => {
                if (option.result === "complete") {
                  gameEvents.emit("puzzle:complete", {
                    puzzleId: activePuzzleId,
                    unlockedJournalEntryIds: [],
                  });
                } else {
                  gameEvents.emit("puzzle:fail", {
                    puzzleId: activePuzzleId,
                    reason: option.id,
                  });
                }
                clearPuzzle();
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
