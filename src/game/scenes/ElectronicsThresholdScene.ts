import * as Phaser from "phaser";
import ohmdalMapRaw from "@/content/maps/ohmdal-threshold.map.json";
import closedCircuitRaw from "@/content/puzzles/closed-circuit-001.json";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "@/game/constants";
import { Player } from "@/game/entities/Player";
import { RoxanaNpc } from "@/game/entities/RoxanaNpc";
import {
  createClosedCircuitState,
  testClosedCircuit,
  toggleCircuitSwitch,
  type ClosedCircuitRuntimeState,
} from "@/game/puzzles/closedCircuitPuzzle";
import { gameEvents } from "@/game/systems/eventBus";
import { setProgressMilestone } from "@/game/systems/progressStore";
import type { DirectionVector } from "@/game/types/events";
import type {
  BoundsRect,
  HubInteractable,
  HubMapData,
  HubSolid,
} from "@/game/types/hubMap";
import type { PuzzleData } from "@/game/types/puzzle";

type WasdKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  E: Phaser.Input.Keyboard.Key;
  SPACE: Phaser.Input.Keyboard.Key;
  ENTER: Phaser.Input.Keyboard.Key;
};

export class ElectronicsThresholdScene extends Phaser.Scene {
  private readonly mapData = ohmdalMapRaw as HubMapData;
  private readonly puzzleData = closedCircuitRaw as PuzzleData;
  private puzzleState: ClosedCircuitRuntimeState = createClosedCircuitState();
  private player?: Player;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys?: WasdKeys;
  private solids: HubSolid[] = [];
  private interactables: HubInteractable[] = [];
  private movementLocked = false;
  private uiLocked = false;
  private suppressInteractUntil = 0;
  private virtualDirection: DirectionVector = { x: 0, y: 0 };
  private activePromptId: string | null = null;
  private cleanupEventHandlers: Array<() => void> = [];
  private switchVisual?: Phaser.GameObjects.Rectangle;
  private pathVisual?: Phaser.GameObjects.Rectangle;
  private mechanismVisual?: Phaser.GameObjects.Rectangle;

  constructor() {
    super("ElectronicsThresholdScene");
  }

  create() {
    this.puzzleState = createClosedCircuitState();
    this.solids = this.mapData.solids;
    this.interactables = this.mapData.interactables;
    this.drawRoom();

    this.player = new Player(this, this.mapData.spawn.x, this.mapData.spawn.y);
    new RoxanaNpc(
      this,
      this.mapData.entities.roxana.x,
      this.mapData.entities.roxana.y,
    );

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.keys = this.input.keyboard?.addKeys(
      "W,A,S,D,E,SPACE,ENTER",
    ) as WasdKeys;

    this.cleanupEventHandlers = [
      gameEvents.on("dialogue:complete", () => {
        this.movementLocked = false;
        this.suppressInteractionBriefly();
      }),
      gameEvents.on("input:virtual-direction", (direction) => {
        this.virtualDirection = direction;
      }),
      gameEvents.on("input:interact", () => {
        this.tryInteract(this.findNearbyInteractable());
      }),
      gameEvents.on("ui:controls-lock", ({ locked }) => {
        this.uiLocked = locked;
        if (locked) {
          this.clearPrompt();
          this.virtualDirection = { x: 0, y: 0 };
        } else {
          this.suppressInteractionBriefly();
        }
      }),
    ];

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.cleanupEventHandlers.forEach((cleanup) => cleanup());
      this.cleanupEventHandlers = [];
      this.clearPrompt();
    });

    gameEvents.emit("scene:ready", { scene: "electronics_threshold" });
    gameEvents.emit("room:entered", {
      roomId: this.mapData.id,
      sourceRoomId: "electronics_classroom",
      firstVisit: false,
    });
    gameEvents.emit("puzzle:start", {
      puzzleId: this.puzzleData.id,
      worldId: this.puzzleData.worldId,
    });
    gameEvents.emit("analytics:track", {
      eventName: "started_puzzle_closed_circuit",
      roomId: this.mapData.id,
      puzzleId: this.puzzleData.id,
    });
    gameEvents.emit("message:show", { messageId: "ohmdal_threshold_arrival" });
  }

  update(_time: number, delta: number) {
    if (!this.player) {
      return;
    }

    const nearbyInteractable = this.findNearbyInteractable();
    this.updateInteractionPrompt(nearbyInteractable);

    if (this.movementLocked || this.uiLocked) {
      return;
    }

    if (this.wasInteractionPressed()) {
      this.tryInteract(nearbyInteractable);
    }

    const direction = this.readMovementDirection();
    this.player.move(direction.x, direction.y, delta, (x, y) =>
      this.canOccupyPlayerAt(x, y),
    );
  }

  private drawRoom() {
    this.cameras.main.setBackgroundColor("#0b151b");

    const graphics = this.add.graphics();
    graphics.fillStyle(0x111b24, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    graphics.lineStyle(1, 0x263247, 0.35);
    for (let x = 0; x <= GAME_WIDTH; x += TILE_SIZE) {
      graphics.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y <= GAME_HEIGHT; y += TILE_SIZE) {
      graphics.lineBetween(0, y, GAME_WIDTH, y);
    }

    for (const decoration of this.mapData.decorations) {
      graphics.fillStyle(this.colorFromHex(decoration.fill), 1);
      graphics.fillRect(
        decoration.x,
        decoration.y,
        decoration.width,
        decoration.height,
      );

      if (decoration.stroke) {
        graphics.lineStyle(1, this.colorFromHex(decoration.stroke), 0.9);
        graphics.strokeRect(
          decoration.x,
          decoration.y,
          decoration.width,
          decoration.height,
        );
      }
    }

    for (const solid of this.solids) {
      graphics.fillStyle(this.styleColorForSolid(solid.style), 1);
      graphics.fillRect(solid.x, solid.y, solid.width, solid.height);
      graphics.lineStyle(1, 0x0f1420, 0.8);
      graphics.strokeRect(solid.x, solid.y, solid.width, solid.height);
    }

    this.pathVisual = this.add.rectangle(191, 88, 192, 6, 0x8b6a42, 0.95);
    this.switchVisual = this.add.rectangle(154, 128, 30, 8, 0xbf6b5a, 0.95);
    this.mechanismVisual = this.add.rectangle(319, 112, 22, 48, 0x315660, 0.95);
    this.mechanismVisual.setStrokeStyle(1, 0x7faeb6, 0.8);
  }

  private tryInteract(interactable: HubInteractable | null) {
    const target = interactable ?? this.findNearbyInteractable();

    if (
      !target ||
      this.movementLocked ||
      this.uiLocked ||
      this.isInteractionSuppressed()
    ) {
      return;
    }

    gameEvents.emit("interaction:start", {
      id: target.id,
      kind: target.kind,
    });

    if (target.kind === "dialogue") {
      const dialogueId = target.payload?.dialogueId;
      const speakerId = target.payload?.speakerId ?? "ohm_automaton";
      if (!dialogueId) {
        return;
      }

      this.movementLocked = true;
      this.clearPrompt();
      gameEvents.emit("dialogue:start", { dialogueId, speakerId });
      return;
    }

    if (target.id === "return_hub") {
      this.scene.start("HubScene");
      return;
    }

    if (target.kind !== "puzzle") {
      const messageId = target.payload?.messageId;
      if (messageId) {
        gameEvents.emit("message:show", { messageId });
      }
      return;
    }

    if (target.id === "circuit_switch") {
      this.puzzleState = toggleCircuitSwitch(this.puzzleState);
      this.switchVisual?.setFillStyle(
        this.puzzleState.switchClosed ? 0x8bd17c : 0xbf6b5a,
        0.95,
      );
      this.pathVisual?.setFillStyle(
        this.puzzleState.switchClosed ? 0xc9a85f : 0x8b6a42,
        0.95,
      );
      gameEvents.emit("puzzle:state-change", {
        puzzleId: this.puzzleData.id,
        state: this.puzzleState.puzzleState,
      });
      if (target.payload?.messageId) {
        gameEvents.emit("message:show", { messageId: target.payload.messageId });
      }
      return;
    }

    if (target.id === "sleeping_mechanism") {
      this.puzzleState = testClosedCircuit(this.puzzleData, this.puzzleState);
      gameEvents.emit("puzzle:state-change", {
        puzzleId: this.puzzleData.id,
        state: this.puzzleState.puzzleState,
      });

      if (this.puzzleState.puzzleState === "complete") {
        this.mechanismVisual?.setFillStyle(0x8bd17c, 1);
        this.pathVisual?.setFillStyle(0xf2d675, 1);
        gameEvents.emit("message:show", { messageId: "ohmdal_mechanism_awake" });
        gameEvents.emit("puzzle:complete", {
          puzzleId: this.puzzleData.id,
          unlockedJournalEntryIds: this.puzzleData.unlockedJournalEntryIds,
        });
        gameEvents.emit("analytics:track", {
          eventName: "completed_puzzle_closed_circuit",
          roomId: this.mapData.id,
          puzzleId: this.puzzleData.id,
        });
        gameEvents.emit("analytics:track", {
          eventName: "finished_demo",
          roomId: this.mapData.id,
          puzzleId: this.puzzleData.id,
        });
        setProgressMilestone("closed_circuit_completed");
        return;
      }

      gameEvents.emit("message:show", { messageId: "ohmdal_circuit_open" });
      gameEvents.emit("analytics:track", {
        eventName: "failed_puzzle_closed_circuit",
        roomId: this.mapData.id,
        puzzleId: this.puzzleData.id,
      });
    }
  }

  private readMovementDirection(): DirectionVector {
    const keyboardX =
      (this.cursors?.left.isDown || this.keys?.A.isDown ? -1 : 0) +
      (this.cursors?.right.isDown || this.keys?.D.isDown ? 1 : 0);
    const keyboardY =
      (this.cursors?.up.isDown || this.keys?.W.isDown ? -1 : 0) +
      (this.cursors?.down.isDown || this.keys?.S.isDown ? 1 : 0);

    return {
      x: keyboardX + this.virtualDirection.x,
      y: keyboardY + this.virtualDirection.y,
    };
  }

  private updateInteractionPrompt(interactable: HubInteractable | null) {
    if (this.movementLocked || this.uiLocked) {
      this.clearPrompt();
      return;
    }

    if (!interactable) {
      this.clearPrompt();
      return;
    }

    if (this.activePromptId !== interactable.id) {
      this.activePromptId = interactable.id;
      gameEvents.emit("hud:prompt", { message: interactable.prompt });
    }
  }

  private wasInteractionPressed() {
    if (!this.keys) {
      return false;
    }

    if (this.isInteractionSuppressed()) {
      return false;
    }

    return (
      Phaser.Input.Keyboard.JustDown(this.keys.E) ||
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE) ||
      Phaser.Input.Keyboard.JustDown(this.keys.ENTER)
    );
  }

  private findNearbyInteractable() {
    if (!this.player) {
      return null;
    }

    let nearest: HubInteractable | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const interactable of this.interactables) {
      if (!this.isPlayerNearBounds(interactable.bounds, 18)) {
        continue;
      }

      const centerX = interactable.bounds.x + interactable.bounds.width / 2;
      const centerY = interactable.bounds.y + interactable.bounds.height / 2;
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        centerX,
        centerY,
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = interactable;
      }
    }

    return nearest;
  }

  private isPlayerNearBounds(bounds: BoundsRect, range: number) {
    if (!this.player) {
      return false;
    }

    const closestX = Phaser.Math.Clamp(
      this.player.x,
      bounds.x,
      bounds.x + bounds.width,
    );
    const closestY = Phaser.Math.Clamp(
      this.player.y,
      bounds.y,
      bounds.y + bounds.height,
    );

    return (
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        closestX,
        closestY,
      ) <= range
    );
  }

  private canOccupyPlayerAt(x: number, y: number) {
    if (!this.player) {
      return true;
    }

    const playerRect: BoundsRect = {
      x: x - this.player.halfWidth,
      y: y - this.player.halfHeight,
      width: this.player.halfWidth * 2,
      height: this.player.halfHeight * 2,
    };

    for (const solid of this.solids) {
      if (this.rectsOverlap(playerRect, solid)) {
        return false;
      }
    }

    return true;
  }

  private rectsOverlap(a: BoundsRect, b: BoundsRect) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  private clearPrompt() {
    if (!this.activePromptId) {
      return;
    }

    this.activePromptId = null;
    gameEvents.emit("hud:prompt", null);
  }

  private colorFromHex(hexColor: string) {
    return Phaser.Display.Color.HexStringToColor(hexColor).color;
  }

  private styleColorForSolid(style: HubSolid["style"]) {
    switch (style) {
      case "wall":
        return 0x2f3d54;
      case "shelf":
        return 0x4f3d2f;
      case "furniture":
        return 0x645341;
      case "gate":
        return 0x2e4a52;
      default:
        return 0x3b4455;
    }
  }

  private suppressInteractionBriefly() {
    this.suppressInteractUntil = this.time.now + 180;
  }

  private isInteractionSuppressed() {
    return this.time.now < this.suppressInteractUntil;
  }
}
