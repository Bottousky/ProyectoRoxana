"use client";

import { useGameStore } from "@/store/useGameStore";

export function HudOverlay() {
  const prompt = useGameStore((state) => state.prompt);
  const journalOpen = useGameStore((state) => state.journalOpen);
  const currentRoomLabel = useGameStore((state) => state.currentRoomLabel);
  const toggleJournal = useGameStore((state) => state.toggleJournal);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute left-3 top-3 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/82 px-3 py-2 text-xs leading-5 text-[var(--roxana-muted)] shadow-lg backdrop-blur">
        <div className="font-semibold text-[var(--roxana-text)]">
          {currentRoomLabel}
        </div>
        <div className="hidden sm:block">WASD / Flechas para moverte</div>
        <div className="hidden sm:block">E / Enter / Espacio para interactuar</div>
        <div className="hidden sm:block">B / J para abrir bitacora</div>
        <div className="hidden sm:block">Esc / Backspace para atras</div>
      </div>

      <button
        type="button"
        aria-pressed={journalOpen}
        className="pointer-events-auto absolute right-3 top-3 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/88 px-3 py-2 text-sm font-semibold text-[var(--roxana-text)] shadow-lg backdrop-blur transition hover:bg-[var(--roxana-panel-strong)]"
        onClick={toggleJournal}
      >
        Bitacora
      </button>

      {prompt ? (
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/88 px-4 py-2 text-sm font-medium text-[var(--roxana-text)] shadow-xl backdrop-blur sm:block">
          {prompt}
        </div>
      ) : null}
    </div>
  );
}
