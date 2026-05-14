"use client";

import centralJournal from "@/content/journal/central.json";
import type { JournalEntry } from "@/game/types/journal";
import { useGameStore } from "@/store/useGameStore";

const entries = centralJournal.entries as JournalEntry[];

export function JournalPanel() {
  const journalOpen = useGameStore((state) => state.journalOpen);
  const toggleJournal = useGameStore((state) => state.toggleJournal);

  if (!journalOpen) {
    return null;
  }

  return (
    <aside className="absolute right-3 top-16 z-30 max-h-[72%] w-[min(22rem,calc(100%-1.5rem))] overflow-auto rounded-lg border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/96 p-4 text-[var(--roxana-text)] shadow-2xl shadow-black/50 backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--roxana-warm)]">
            Bitacora central
          </p>
          <h2 className="text-lg font-semibold">Notas de Roxana</h2>
        </div>
        <button
          type="button"
          className="rounded-md border border-[var(--roxana-border)] px-3 py-2 text-sm font-semibold text-[var(--roxana-muted)] transition hover:bg-[var(--roxana-panel-strong)] hover:text-[var(--roxana-text)]"
          onClick={toggleJournal}
        >
          Cerrar
        </button>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-md border border-[var(--roxana-border)] bg-black/18 p-3"
          >
            <div className="mb-1 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">{entry.title}</h3>
              <span className="text-xs text-[var(--roxana-muted)]">
                {entry.scope}
              </span>
            </div>
            <p className="text-sm leading-6 text-[var(--roxana-muted)]">
              {entry.body}
            </p>
          </article>
        ))}
      </div>
    </aside>
  );
}
