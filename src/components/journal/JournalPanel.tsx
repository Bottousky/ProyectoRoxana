"use client";

import { useEffect, useMemo } from "react";
import centralJournal from "@/content/journal/central.json";
import ohmdalJournal from "@/content/journal/ohmdal.json";
import { gameEvents } from "@/game/systems/eventBus";
import type { JournalEntry } from "@/game/types/journal";
import { useGameStore } from "@/store/useGameStore";

const entries = [
  ...(centralJournal.entries as JournalEntry[]),
  ...(ohmdalJournal.entries as JournalEntry[]),
];
const defaultUnlockedEntries = new Set(["central_hub_inicio"]);

export function JournalPanel() {
  const journalOpen = useGameStore((state) => state.journalOpen);
  const journalFocusEntryId = useGameStore((state) => state.journalFocusEntryId);
  const journalMode = useGameStore((state) => state.journalMode);
  const unlockedJournalEntryIds = useGameStore(
    (state) => state.unlockedJournalEntryIds,
  );
  const closeJournal = useGameStore((state) => state.closeJournal);
  const setJournalMode = useGameStore((state) => state.setJournalMode);

  const unlockedEntries = useMemo(
    () => new Set([...defaultUnlockedEntries, ...unlockedJournalEntryIds]),
    [unlockedJournalEntryIds],
  );

  useEffect(() => {
    if (!journalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" && event.key !== "Backspace") {
        return;
      }

      event.preventDefault();
      closeJournal();
    }

    const offBack = gameEvents.on("input:back", closeJournal);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      offBack();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeJournal, journalOpen]);

  useEffect(() => {
    if (!journalOpen || !journalFocusEntryId) {
      return;
    }

    if (!unlockedEntries.has(journalFocusEntryId)) {
      return;
    }

    gameEvents.emit("analytics:track", {
      eventName:
        journalMode === "technical" ? "opened_formal_entry" : "opened_light_entry",
      entryId: journalFocusEntryId,
      source: "journal",
    });
  }, [journalFocusEntryId, journalMode, journalOpen, unlockedEntries]);

  if (!journalOpen) {
    return null;
  }

  const sortedEntries =
    journalFocusEntryId === null
      ? entries
      : [...entries].sort((a, b) => {
          if (a.id === journalFocusEntryId) {
            return -1;
          }
          if (b.id === journalFocusEntryId) {
            return 1;
          }
          return 0;
        });

  return (
    <aside className="absolute right-3 top-16 z-30 max-h-[72%] w-[min(23rem,calc(100%-1.5rem))] overflow-auto rounded-lg border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/96 p-4 text-[var(--roxana-text)] shadow-2xl shadow-black/50 backdrop-blur">
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
          onClick={closeJournal}
        >
          Cerrar
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-md border border-[var(--roxana-border)] bg-black/20 p-1 text-sm">
        <button
          type="button"
          className={`rounded px-3 py-2 font-semibold transition ${
            journalMode === "simple"
              ? "bg-[var(--roxana-accent)] text-[#102126]"
              : "text-[var(--roxana-muted)] hover:bg-[var(--roxana-panel-strong)]"
          }`}
          onClick={() => setJournalMode("simple")}
        >
          Simple
        </button>
        <button
          type="button"
          className={`rounded px-3 py-2 font-semibold transition ${
            journalMode === "technical"
              ? "bg-[var(--roxana-accent)] text-[#102126]"
              : "text-[var(--roxana-muted)] hover:bg-[var(--roxana-panel-strong)]"
          }`}
          onClick={() => setJournalMode("technical")}
        >
          Tecnica
        </button>
      </div>

      <div className="space-y-3">
        {sortedEntries.map((entry) => {
          const isUnlocked = unlockedEntries.has(entry.id);
          const body =
            journalMode === "technical"
              ? entry.technical ?? entry.body
              : entry.simple ?? entry.body;

          return (
            <article
              key={entry.id}
              className={`rounded-md border p-3 ${
                entry.id === journalFocusEntryId
                  ? "border-[var(--roxana-accent)] bg-[var(--roxana-panel-strong)]/75"
                  : "border-[var(--roxana-border)] bg-black/18"
              } ${isUnlocked ? "" : "opacity-65"}`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">
                  {isUnlocked ? entry.title : "Entrada pendiente"}
                </h3>
                <span className="text-xs text-[var(--roxana-muted)]">
                  {isUnlocked ? entry.scope : "bloqueada"}
                </span>
              </div>
              <p className="text-sm leading-6 text-[var(--roxana-muted)]">
                {isUnlocked
                  ? body
                  : "La pagina esta limpia. Parece esperar una experiencia concreta antes de dejarse leer."}
              </p>
              {isUnlocked && journalMode === "technical" ? (
                <div className="mt-3 space-y-2">
                  {entry.videoLinks?.map((link) => (
                    <a
                      key={link.id}
                      className="block rounded border border-[var(--roxana-border)] px-3 py-2 text-xs font-semibold text-[var(--roxana-accent)] transition hover:bg-[var(--roxana-panel-strong)]"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        gameEvents.emit("analytics:track", {
                          eventName: "clicked_video",
                          entryId: entry.id,
                          source: link.id,
                        })
                      }
                    >
                      {link.label}
                    </a>
                  ))}
                  {entry.exerciseLinks?.map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      className="block w-full rounded border border-[var(--roxana-border)] px-3 py-2 text-left text-xs font-semibold text-[var(--roxana-muted)] transition hover:bg-[var(--roxana-panel-strong)] hover:text-[var(--roxana-text)]"
                      onClick={() =>
                        gameEvents.emit("analytics:track", {
                          eventName: "completed_optional_exercise",
                          entryId: entry.id,
                          source: link.id,
                        })
                      }
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </aside>
  );
}
