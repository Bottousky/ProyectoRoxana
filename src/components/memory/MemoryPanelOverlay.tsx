"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ohmdalPreview from "@/content/memories/ohmdal-preview.json";
import roxanaOfficeDiscovery from "@/content/memories/roxana-office-discovery.json";
import { gameEvents } from "@/game/systems/eventBus";
import type { MemorySequence } from "@/game/types/memory";
import { useGameStore } from "@/store/useGameStore";

const memoryLibrary: Record<string, MemorySequence> = {
  [ohmdalPreview.id]: ohmdalPreview as MemorySequence,
  [roxanaOfficeDiscovery.id]: roxanaOfficeDiscovery as MemorySequence,
};

export function MemoryPanelOverlay() {
  const activeMemoryId = useGameStore((state) => state.activeMemoryId);
  const activeMemoryBeatId = useGameStore((state) => state.activeMemoryBeatId);
  const completeMemory = useGameStore((state) => state.completeMemory);
  const [progress, setProgress] = useState<{
    memoryId: string | null;
    panelIndex: number;
  }>({ memoryId: null, panelIndex: 0 });

  const memory = useMemo(() => {
    return activeMemoryId ? memoryLibrary[activeMemoryId] : null;
  }, [activeMemoryId]);

  const panelIndex =
    memory && progress.memoryId === activeMemoryId ? progress.panelIndex : 0;
  const panel = memory?.panels[panelIndex] ?? null;
  const isLastPanel = memory ? panelIndex >= memory.panels.length - 1 : false;

  const closeMemory = useCallback(
    (skipped: boolean) => {
      if (!memory) {
        return;
      }

      completeMemory();
      setProgress({ memoryId: null, panelIndex: 0 });
      gameEvents.emit("memory:complete", {
        memoryId: memory.id,
        beatId: activeMemoryBeatId ?? memory.onCompleteBeatId,
        skipped,
      });
    },
    [activeMemoryBeatId, completeMemory, memory],
  );

  const advanceMemory = useCallback(() => {
    if (!memory) {
      return;
    }

    if (isLastPanel) {
      closeMemory(false);
      return;
    }

    setProgress({
      memoryId: memory.id,
      panelIndex: panelIndex + 1,
    });
  }, [closeMemory, isLastPanel, memory, panelIndex]);

  useEffect(() => {
    if (!memory) {
      return;
    }
    const activeMemory = memory;

    function handleKeyDown(event: KeyboardEvent) {
      const isAdvanceKey =
        event.key === "Enter" ||
        event.key === " " ||
        event.key.toLowerCase() === "e";
      const isBackKey = event.key === "Escape" || event.key === "Backspace";

      if (isAdvanceKey) {
        event.preventDefault();
        advanceMemory();
      }

      if (isBackKey && activeMemory.skippable) {
        event.preventDefault();
        closeMemory(true);
      }
    }

    const offInteract = gameEvents.on("input:interact", advanceMemory);
    const offBack = gameEvents.on("input:back", () => {
      if (activeMemory.skippable) {
        closeMemory(true);
      }
    });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      offInteract();
      offBack();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [advanceMemory, closeMemory, memory]);

  if (!memory || !panel) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#07090d]/92 p-3 text-[var(--roxana-text)] backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-[#c9a85f]/45 bg-[#100f0c] shadow-2xl shadow-black/70">
        <div className="relative aspect-video overflow-hidden bg-[#2a1b10]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(232,205,129,0.35),transparent_34%),linear-gradient(135deg,rgba(86,48,23,0.95),rgba(27,58,50,0.85)_55%,rgba(8,12,15,0.95))]" />
          <div className="absolute inset-x-8 top-8 h-16 rounded-full bg-[#f6d87a]/18 blur-xl" />
          <div className="absolute bottom-[22%] left-[14%] h-[48%] w-[18%] rounded-t-full border border-[#d7b65f]/55 bg-[#8a6a38]/55 shadow-[0_0_28px_rgba(201,168,95,0.25)]" />
          <div className="absolute bottom-[18%] left-[42%] h-[62%] w-[16%] rounded-t-full border border-[#d7b65f]/55 bg-[#416752]/70 shadow-[0_0_34px_rgba(139,209,124,0.22)]" />
          <div className="absolute bottom-[20%] right-[16%] h-[42%] w-[20%] rounded-t-full border border-[#d7b65f]/45 bg-[#5b3d24]/65" />
          <div className="absolute bottom-[30%] left-[26%] right-[22%] h-2 rotate-[-5deg] bg-[#c9a85f]/60 shadow-[0_0_18px_rgba(201,168,95,0.25)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,245,199,0.12),transparent_22%,rgba(0,0,0,0.35))]" />
          <div className="absolute left-3 top-3 rounded border border-[#c9a85f]/35 bg-black/35 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#f0d891]">
            {panel.imageId}
          </div>
        </div>

        <div className="border-t border-[#c9a85f]/35 bg-[#0c1110]/96 p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a85f]">
                Recuerdo
              </p>
              <h2 className="text-base font-semibold sm:text-lg">
                {memory.title}
              </h2>
            </div>
            {memory.skippable ? (
              <button
                type="button"
                className="rounded-md border border-[var(--roxana-border)] px-3 py-2 text-sm font-semibold text-[var(--roxana-muted)] transition hover:bg-[var(--roxana-panel-strong)] hover:text-[var(--roxana-text)]"
                onClick={() => closeMemory(true)}
              >
                Omitir
              </button>
            ) : null}
          </div>

          <p className="min-h-14 text-base leading-7 text-[var(--roxana-text)] sm:text-lg">
            {panel.caption}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-[var(--roxana-muted)]">
              {panelIndex + 1} / {memory.panels.length}
            </span>
            <button
              type="button"
              className="rounded-md bg-[#c9a85f] px-4 py-2 text-sm font-bold text-[#102126] transition hover:brightness-110"
              onClick={advanceMemory}
            >
              {isLastPanel ? "Volver" : "Continuar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
