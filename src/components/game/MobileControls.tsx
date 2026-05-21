"use client";

import { gameEvents } from "@/game/systems/eventBus";
import { useGameStore } from "@/store/useGameStore";

const directions = {
  up: { x: 0, y: -1, label: "Arriba" },
  left: { x: -1, y: 0, label: "Izquierda" },
  right: { x: 1, y: 0, label: "Derecha" },
  down: { x: 0, y: 1, label: "Abajo" },
} as const;

function emitDirection(x: number, y: number) {
  gameEvents.emit("input:virtual-direction", { x, y });
}

export function MobileControls() {
  const journalOpen = useGameStore((state) => state.journalOpen);
  const closeJournal = useGameStore((state) => state.closeJournal);

  const toggleJournal = () => {
    if (journalOpen) {
      closeJournal();
      gameEvents.emit("journal:close");
      return;
    }

    gameEvents.emit("journal:open", {
      mode: "simple",
    });
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex items-end justify-between px-3 md:hidden">
      <div className="pointer-events-auto grid grid-cols-3 grid-rows-3 gap-1.5">
        <span />
        <DirectionButton direction="up" />
        <span />
        <DirectionButton direction="left" />
        <button
          type="button"
          aria-label="Interactuar"
          className="roxana-control-button h-10 w-10 rounded-full border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/85 text-sm font-bold text-[var(--roxana-accent)] shadow-lg backdrop-blur"
          onPointerDown={() => gameEvents.emit("input:interact")}
        >
          E
        </button>
        <DirectionButton direction="right" />
        <span />
        <DirectionButton direction="down" />
        <span />
      </div>
      <div className="pointer-events-auto flex gap-2">
        <button
          type="button"
          aria-label="Bitacora"
          aria-pressed={journalOpen}
          className="roxana-control-button h-11 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/85 px-3 text-xs font-bold text-[var(--roxana-accent)] shadow-lg backdrop-blur active:bg-[var(--roxana-panel-strong)]"
          onPointerDown={toggleJournal}
        >
          Bitacora
        </button>
        <button
          type="button"
          aria-label="Atras"
          className="roxana-control-button h-11 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/85 px-3 text-xs font-bold text-[var(--roxana-muted)] shadow-lg backdrop-blur active:bg-[var(--roxana-panel-strong)]"
          onPointerDown={() => gameEvents.emit("input:back")}
        >
          Atras
        </button>
      </div>
    </div>
  );
}

function DirectionButton({ direction }: { direction: keyof typeof directions }) {
  const config = directions[direction];
  const label =
    direction === "up"
      ? "W"
      : direction === "down"
        ? "S"
        : direction === "left"
          ? "A"
          : "D";

  return (
    <button
      type="button"
      aria-label={config.label}
      className="roxana-control-button h-10 w-10 rounded-md border border-[var(--roxana-border)] bg-[var(--roxana-panel)]/85 text-base font-bold text-[var(--roxana-text)] shadow-lg backdrop-blur active:bg-[var(--roxana-panel-strong)]"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        emitDirection(config.x, config.y);
      }}
      onPointerUp={() => emitDirection(0, 0)}
      onPointerCancel={() => emitDirection(0, 0)}
      onPointerLeave={() => emitDirection(0, 0)}
    >
      {label}
    </button>
  );
}
