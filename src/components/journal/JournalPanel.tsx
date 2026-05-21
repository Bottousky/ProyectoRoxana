"use client";

import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useMemo, useState } from "react";
import centralJournal from "@/content/journal/central.json";
import ohmdalJournal from "@/content/journal/ohmdal.json";
import { gameEvents } from "@/game/systems/eventBus";
import type {
  FlagshipJournalEntry,
  JournalBlock,
  JournalEntry,
  JournalRevealStage,
  JournalSpread,
} from "@/game/types/journal";
import type { JournalViewMode } from "@/game/types/events";
import { useGameStore } from "@/store/useGameStore";

type JournalEntryLike = JournalEntry | FlagshipJournalEntry;

const defaultUnlockedEntries = new Set(["central_hub_inicio"]);
const entries = [
  ...(centralJournal.entries as JournalEntryLike[]),
  ...(ohmdalJournal.entries as JournalEntryLike[]),
];

type NormalizedEntry = {
  id: string;
  title: string;
  scope: "central" | "world";
  worldId?: string;
  videoLinks?: JournalEntry["videoLinks"];
  exerciseLinks?: JournalEntry["exerciseLinks"];
  spreads: JournalSpread[];
  revealStages: JournalRevealStage[];
  blocks: JournalBlock[];
};

function isFlagshipEntry(entry: JournalEntryLike): entry is FlagshipJournalEntry {
  return (
    "spreads" in entry &&
    Array.isArray(entry.spreads) &&
    "revealStages" in entry &&
    Array.isArray(entry.revealStages) &&
    "blocks" in entry &&
    Array.isArray(entry.blocks)
  );
}

function normalizeLegacyEntry(entry: JournalEntry): NormalizedEntry {
  const simpleText = entry.simple ?? entry.body ?? "";
  const technicalText = entry.technical ?? entry.body ?? simpleText;

  return {
    id: entry.id,
    title: entry.title,
    scope: entry.scope,
    worldId: entry.worldId,
    videoLinks: entry.videoLinks,
    exerciseLinks: entry.exerciseLinks,
    spreads: [
      {
        id: `${entry.id}_spread_1`,
        title: entry.title,
        leftPageNumber: 1,
        rightPageNumber: 2,
      },
    ],
    revealStages: [
      {
        id: "legacy_unlocked",
        title: "Entrada desbloqueada",
        summary: "Esta entrada usa el formato clasico.",
      },
    ],
    blocks: [
      {
        id: `${entry.id}_title`,
        type: "title",
        stageId: "legacy_unlocked",
        page: "left",
        x: 8,
        y: 6,
        width: 84,
        layerMode: "both",
        title: entry.title,
      },
      {
        id: `${entry.id}_simple`,
        type: "paragraph",
        stageId: "legacy_unlocked",
        page: "left",
        x: 8,
        y: 22,
        width: 84,
        layerMode: "simple",
        text: simpleText,
      },
      {
        id: `${entry.id}_technical`,
        type: "paragraph",
        stageId: "legacy_unlocked",
        page: "right",
        x: 8,
        y: 22,
        width: 84,
        layerMode: "technical",
        text: technicalText,
      },
    ],
  };
}

function normalizeEntry(entry: JournalEntryLike): NormalizedEntry {
  if (isFlagshipEntry(entry)) {
    return {
      id: entry.id,
      title: entry.title,
      scope: entry.scope,
      worldId: entry.worldId,
      videoLinks: entry.videoLinks,
      exerciseLinks: entry.exerciseLinks,
      spreads: entry.spreads,
      revealStages: entry.revealStages,
      blocks: entry.blocks,
    };
  }

  return normalizeLegacyEntry(entry);
}

function stageIndexMap(stages: JournalRevealStage[]) {
  const map = new Map<string, number>();
  stages.forEach((stage, index) => map.set(stage.id, index));
  return map;
}

function shouldShowBlock(
  block: JournalBlock,
  mode: JournalViewMode,
  stageMap: Map<string, number>,
  unlockedStageIds: string[],
) {
  if (block.layerMode && block.layerMode !== "both" && block.layerMode !== mode) {
    return false;
  }

  const blockStageIndex = stageMap.get(block.stageId);
  if (blockStageIndex === undefined) {
    return false;
  }

  return unlockedStageIds.some((stageId) => {
    const unlockedIndex = stageMap.get(stageId);
    return unlockedIndex !== undefined && unlockedIndex >= blockStageIndex;
  });
}

function blockStyle(block: JournalBlock) {
  return {
    left: `${block.x}%`,
    top: `${block.y}%`,
    width: `${block.width}%`,
  };
}

function renderDiagram(block: JournalBlock) {
  const points = block.points ?? [];
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const labels = block.labels ?? [];

  return (
    <div className="rounded-sm border border-[rgba(48,38,24,0.28)] bg-[#f4e8d2]/80 px-2 py-2">
      <svg viewBox="0 0 64 40" className="h-24 w-full">
        <polyline
          points={polyline}
          fill="none"
          stroke="#4f3f29"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="2 1"
        />
        {points.map((point, index) => (
          <circle
            key={`${block.id}_${index}`}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={index % 2 === 0 ? "#8b4d32" : "#2f5f61"}
          />
        ))}
      </svg>
      <div className="mt-1 grid grid-cols-2 gap-1 text-[10px] uppercase tracking-[0.08em] text-[#5a4d3a]">
        {labels.map((label) => (
          <span key={`${block.id}_${label}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function renderBlock(block: JournalBlock) {
  switch (block.type) {
    case "title":
      return (
        <h3 className="font-serif text-sm uppercase tracking-[0.14em] text-[#382d20]">
          {block.title ?? "Entrada"}
        </h3>
      );
    case "paragraph":
      return <p className="text-[13px] leading-5 text-[#3e3326]">{block.text}</p>;
    case "annotation":
      return (
        <p className="rotate-[-1deg] border-l-2 border-[#8b4d32]/65 pl-2 font-mono text-[12px] leading-5 text-[#6b4332]">
          {block.text}
        </p>
      );
    case "callout":
      return (
        <div className="rounded-sm border border-[#6e5a3f]/40 bg-[#f8eddc]/82 px-2 py-2">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#735c39]">
            {block.title ?? "Nota"}
          </p>
          <p className="mt-1 text-[12px] leading-5 text-[#443827]">{block.text}</p>
        </div>
      );
    case "formula":
      return (
        <div className="rounded-sm border border-[#6f6045]/40 bg-[#f9f0e2]/88 px-2 py-2 text-[#403225]">
          <BlockMath math={block.latex ?? ""} />
          {block.text ? (
            <p className="mt-1 text-[11px] leading-4 text-[#5a4c3a]">
              <InlineMath math={block.text} />
            </p>
          ) : null}
        </div>
      );
    case "diagram":
      return renderDiagram(block);
    case "graph":
      return (
        <div className="rounded-sm border border-[#6f6045]/35 bg-[#f8eedc]/85 px-2 py-2">
          <svg viewBox="0 0 100 58" className="h-20 w-full">
            <line x1="8" y1="50" x2="94" y2="50" stroke="#4e4332" strokeWidth="1.2" />
            <line x1="8" y1="50" x2="8" y2="8" stroke="#4e4332" strokeWidth="1.2" />
            <polyline
              points="10,48 22,44 36,40 52,30 64,26 78,16 92,12"
              fill="none"
              stroke="#a5553c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#6b5b43]">
            Curva de respuesta
          </p>
        </div>
      );
    case "illustration":
      return (
        <div className="rounded-sm border border-dashed border-[#6f6045]/35 bg-[#efe2ca]/68 px-2 py-2 text-[11px] uppercase tracking-[0.08em] text-[#6f5a42]">
          {block.note ?? "Ilustracion en desarrollo"}
        </div>
      );
    default:
      return null;
  }
}

export function JournalPanel() {
  const journalOpen = useGameStore((state) => state.journalOpen);
  const journalFocusEntryId = useGameStore((state) => state.journalFocusEntryId);
  const journalMode = useGameStore((state) => state.journalMode);
  const unlockedJournalEntryIds = useGameStore(
    (state) => state.unlockedJournalEntryIds,
  );
  const unlockedJournalStagesByEntry = useGameStore(
    (state) => state.unlockedJournalStagesByEntry,
  );
  const journalSpreadIndexByEntry = useGameStore(
    (state) => state.journalSpreadIndexByEntry,
  );
  const hasSeenJournalFirstOpen = useGameStore(
    (state) => state.hasSeenJournalFirstOpen,
  );
  const closeJournal = useGameStore((state) => state.closeJournal);
  const setJournalMode = useGameStore((state) => state.setJournalMode);
  const setJournalSpreadIndex = useGameStore((state) => state.setJournalSpreadIndex);
  const markJournalFirstOpenSeen = useGameStore(
    (state) => state.markJournalFirstOpenSeen,
  );
  const [openFrame, setOpenFrame] = useState(0);

  const unlockedEntries = useMemo(
    () => new Set([...defaultUnlockedEntries, ...unlockedJournalEntryIds]),
    [unlockedJournalEntryIds],
  );

  const normalizedEntries = useMemo(
    () => entries.map((entry) => normalizeEntry(entry)),
    [],
  );

  const activeEntry = useMemo(() => {
    if (!journalFocusEntryId) {
      return normalizedEntries.find((entry) => unlockedEntries.has(entry.id)) ?? null;
    }

    return (
      normalizedEntries.find((entry) => entry.id === journalFocusEntryId) ??
      normalizedEntries.find((entry) => unlockedEntries.has(entry.id)) ??
      null
    );
  }, [journalFocusEntryId, normalizedEntries, unlockedEntries]);

  const activeStages = useMemo(() => {
    if (!activeEntry) {
      return [];
    }

    const unlocked = unlockedJournalStagesByEntry[activeEntry.id] ?? [];
    if (unlocked.length > 0) {
      return unlocked;
    }

    return ["legacy_unlocked"];
  }, [activeEntry, unlockedJournalStagesByEntry]);

  useEffect(() => {
    if (!journalOpen) {
      return;
    }

    const openingDelay = hasSeenJournalFirstOpen ? 120 : 520;
    const timer = window.setTimeout(() => setOpenFrame(1), openingDelay);

    if (!hasSeenJournalFirstOpen) {
      markJournalFirstOpenSeen();
      gameEvents.emit("analytics:track", {
        eventName: "opened_flagship_journal",
      });
    }

    return () => window.clearTimeout(timer);
  }, [hasSeenJournalFirstOpen, journalOpen, markJournalFirstOpenSeen]);

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
      gameEvents.emit("journal:close");
    }

    const offBack = gameEvents.on("input:back", closeJournal);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      offBack();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeJournal, journalOpen]);

  useEffect(() => {
    if (!journalOpen || !activeEntry) {
      return;
    }

    gameEvents.emit("analytics:track", {
      eventName: journalMode === "technical" ? "opened_formal_entry" : "opened_light_entry",
      entryId: activeEntry.id,
      source: "journal",
    });
  }, [activeEntry, journalMode, journalOpen]);

  if (!journalOpen || !activeEntry) {
    return null;
  }

  const currentSpreadIndex = Math.min(
    journalSpreadIndexByEntry[activeEntry.id] ?? 0,
    activeEntry.spreads.length - 1,
  );
  const currentSpread = activeEntry.spreads[currentSpreadIndex];
  const stageMap = stageIndexMap(activeEntry.revealStages);
  const visibleBlocks = activeEntry.blocks.filter((block) => {
    if (!shouldShowBlock(block, journalMode, stageMap, activeStages)) {
      return false;
    }
    return block.page === "left" || block.page === "right";
  });

  const leftBlocks = visibleBlocks.filter((block) => block.page === "left");
  const rightBlocks = visibleBlocks.filter((block) => block.page === "right");

  const canGoPrev = currentSpreadIndex > 0;
  const canGoNext = currentSpreadIndex < activeEntry.spreads.length - 1;

  const goToSpread = (direction: "next" | "prev") => {
    const nextIndex =
      direction === "next" ? currentSpreadIndex + 1 : currentSpreadIndex - 1;
    if (nextIndex < 0 || nextIndex >= activeEntry.spreads.length) {
      return;
    }

    setJournalSpreadIndex(activeEntry.id, nextIndex);
    gameEvents.emit("journal:page-changed", {
      entryId: activeEntry.id,
      spreadId: activeEntry.spreads[nextIndex].id,
      direction,
    });
    gameEvents.emit("analytics:track", {
      eventName: "journal_page_turned",
      entryId: activeEntry.id,
      source: direction,
    });
  };

  const switchMode = (mode: JournalViewMode) => {
    setJournalMode(mode);
    gameEvents.emit("journal:layer-toggled", {
      entryId: activeEntry.id,
      mode,
    });
    if (mode === "technical") {
      gameEvents.emit("analytics:track", {
        eventName: "journal_technical_opened",
        entryId: activeEntry.id,
      });
    }
  };

  const closeBook = () => {
    closeJournal();
    gameEvents.emit("journal:close");
  };

  return (
    <section className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(5,8,12,0.76)] p-2 sm:p-4">
      <div
        className={`relative w-full max-w-[1080px] overflow-hidden rounded-md border border-[#2a231a] bg-[#2b2118] shadow-[0_30px_80px_rgba(0,0,0,0.62)] transition-all duration-500 ${
          openFrame ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#3b2f24] bg-[#33271d] px-3 py-2 text-[#eadfcf] sm:px-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#d5b98f]">
              Bitacora de Roxana
            </p>
            <h2 className="text-sm font-semibold sm:text-base">{activeEntry.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => switchMode("simple")}
              className={`rounded px-2 py-1 text-xs font-semibold transition sm:px-3 ${
                journalMode === "simple"
                  ? "bg-[#d7b06b] text-[#2e2419]"
                  : "bg-[#4a3b2d] text-[#eadfcf] hover:bg-[#5a4736]"
              }`}
            >
              Simple
            </button>
            <button
              type="button"
              onClick={() => switchMode("technical")}
              className={`rounded px-2 py-1 text-xs font-semibold transition sm:px-3 ${
                journalMode === "technical"
                  ? "bg-[#d7b06b] text-[#2e2419]"
                  : "bg-[#4a3b2d] text-[#eadfcf] hover:bg-[#5a4736]"
              }`}
            >
              Tecnica
            </button>
            <button
              type="button"
              onClick={closeBook}
              className="rounded bg-[#573d2f] px-3 py-1 text-xs font-semibold text-[#eadfcf] transition hover:bg-[#674935]"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="relative flex flex-col gap-3 bg-[#3a2e24] p-3 sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
            <article className="relative min-h-[320px] rounded-sm border border-[#5d4b34]/40 bg-[#e8d7be] p-3 shadow-inner">
              <div className="absolute inset-y-0 right-0 w-[1px] bg-[#6b5b42]/30" />
              {leftBlocks.map((block) => (
                <div
                  key={block.id}
                  style={blockStyle(block)}
                  className="absolute animate-[journalReveal_450ms_ease-out]"
                >
                  {renderBlock(block)}
                </div>
              ))}
              <span className="absolute bottom-2 left-3 text-[10px] text-[#5a4a36]">
                p. {currentSpread.leftPageNumber}
              </span>
            </article>

            <article className="relative min-h-[320px] rounded-sm border border-[#5d4b34]/40 bg-[#ecdcc4] p-3 shadow-inner">
              <div className="absolute inset-y-0 left-0 w-[1px] bg-[#6b5b42]/30" />
              {rightBlocks.map((block) => (
                <div
                  key={block.id}
                  style={blockStyle(block)}
                  className="absolute animate-[journalReveal_450ms_ease-out]"
                >
                  {renderBlock(block)}
                </div>
              ))}
              <span className="absolute bottom-2 right-3 text-[10px] text-[#5a4a36]">
                p. {currentSpread.rightPageNumber}
              </span>
            </article>
          </div>

          <div className="flex items-center justify-between rounded border border-[#5f4a30]/35 bg-[#2f241b] px-3 py-2 text-[#e6d8c2]">
            <button
              type="button"
              onClick={() => goToSpread("prev")}
              disabled={!canGoPrev}
              className="rounded bg-[#4b3b2f] px-3 py-1 text-xs font-semibold transition enabled:hover:bg-[#5b4838] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Pagina anterior
            </button>
            <p className="text-center text-[11px] uppercase tracking-[0.1em] text-[#c5ab82]">
              {currentSpread.title ?? "Spread"} ({currentSpreadIndex + 1}/
              {activeEntry.spreads.length})
            </p>
            <button
              type="button"
              onClick={() => goToSpread("next")}
              disabled={!canGoNext}
              className="rounded bg-[#4b3b2f] px-3 py-1 text-xs font-semibold transition enabled:hover:bg-[#5b4838] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Pagina siguiente
            </button>
          </div>

          {journalMode === "technical" ? (
            <div className="rounded border border-[#5f4a30]/35 bg-[#2f241b] p-2">
              <div className="flex flex-wrap gap-2">
                {activeEntry.videoLinks?.map((link) => (
                  <a
                    key={link.id}
                    className="rounded border border-[#8f7351]/55 px-3 py-1 text-xs font-semibold text-[#e2c696] transition hover:bg-[#4b3b2f]"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      gameEvents.emit("analytics:track", {
                        eventName: "clicked_video",
                        entryId: activeEntry.id,
                        source: link.id,
                      })
                    }
                  >
                    {link.label}
                  </a>
                ))}
                {activeEntry.exerciseLinks?.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className="rounded border border-[#8f7351]/55 px-3 py-1 text-xs font-semibold text-[#e2c696] transition hover:bg-[#4b3b2f]"
                    onClick={() =>
                      gameEvents.emit("analytics:track", {
                        eventName: "completed_optional_exercise",
                        entryId: activeEntry.id,
                        source: link.id,
                      })
                    }
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
