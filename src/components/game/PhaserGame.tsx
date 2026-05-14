"use client";

import { useEffect, useRef } from "react";
import type { Game } from "phaser";

export function PhaserGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let game: Game | null = null;
    let cancelled = false;

    async function mountGame() {
      const { createRoxanaGame } = await import("@/game/createRoxanaGame");

      if (!containerRef.current || cancelled) {
        return;
      }

      game = createRoxanaGame(containerRef.current);
    }

    mountGame();

    return () => {
      cancelled = true;
      game?.destroy(true);
      game = null;
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full bg-[#10141f]" />;
}
