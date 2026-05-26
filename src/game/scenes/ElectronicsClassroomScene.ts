import * as Phaser from "phaser";
import classroomMapRaw from "@/content/maps/electronics-classroom.map.json";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "@/game/constants";
import { Player } from "@/game/entities/Player";
import { RoxanaNpc } from "@/game/entities/RoxanaNpc";
import { drawMapArtBackground } from "@/game/systems/mapArt";
import { gameEvents } from "@/game/systems/eventBus";
import {
  completeNarrativeBeat,
  hasCompletedNarrativeBeat,
  hasVisitedRoom,
  markRoomVisited,
  setLastRoom,
} from "@/game/systems/progressStore";
import type { DirectionVector } from "@/game/types/events";
import type {
  BoundsRect,
  HubInteractable,
  HubMapData,
  HubSolid,
} from "@/game/types/hubMap";

type WasdKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  E: Phaser.Input.Keyboard.Key;
  SPACE: Phaser.Input.Keyboard.Key;
  ENTER: Phaser.Input.Keyboard.Key;
};

export class ElectronicsClassroomScene extends Phaser.Scene {
  private readonly mapData = classroomMapRaw as HubMapData;
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

  constructor() {
    super("ElectronicsClassroomScene");
  }

  create() {
    const firstVisit = !hasVisitedRoom(this.mapData.id);
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

    gameEvents.emit("scene:ready", { scene: "electronics_classroom" });
    gameEvents.emit("room:entered", {
      roomId: this.mapData.id,
      sourceRoomId: "roxana_library_hub",
      firstVisit,
    });
    gameEvents.emit("analytics:track", {
      eventName: "entered_electronics_classroom",
      roomId: this.mapData.id,
      metadata: { firstVisit },
    });
    markRoomVisited(this.mapData.id);
    setLastRoom(this.mapData.id);

    if (firstVisit) {
      gameEvents.emit("narrative:beat-completed", {
        beatId: "electronics_classroom_first_entry",
        roomId: this.mapData.id,
      });
      completeNarrativeBeat("electronics_classroom_first_entry");
    }
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
    this.cameras.main.setBackgroundColor("#0b1712");

    const hasMapArt = drawMapArtBackground(this, this.mapData);
    const graphics = this.add.graphics();
    if (!hasMapArt) {
      graphics.fillStyle(0x101c17, 1);
      graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    graphics.lineStyle(1, 0x274638, 0.36);
    for (let x = 0; x <= GAME_WIDTH; x += TILE_SIZE) {
      graphics.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y <= GAME_HEIGHT; y += TILE_SIZE) {
      graphics.lineBetween(0, y, GAME_WIDTH, y);
    }

    for (const decoration of this.mapData.decorations) {
      graphics.fillStyle(this.colorFromHex(decoration.fill), hasMapArt ? 0.42 : 1);
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
      graphics.fillStyle(this.styleColorForSolid(solid.style), hasMapArt ? 0.72 : 1);
      graphics.fillRect(solid.x, solid.y, solid.width, solid.height);
      graphics.lineStyle(1, 0x0b120f, 0.8);
      graphics.strokeRect(solid.x, solid.y, solid.width, solid.height);
    }
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

    if (target.id === "return_hub") {
      this.scene.start("HubScene", { spawnPointId: "ohmdal_gate" });
      return;
    }

    if (target.kind === "dialogue") {
      const dialogueId = target.payload?.dialogueId;
      const speakerId = target.payload?.speakerId ?? "ohm_automaton";
      if (!dialogueId) {
        return;
      }

      if (hasCompletedNarrativeBeat("ohmdal_automaton_first_contact")) {
        gameEvents.emit("message:show", {
          messageId: "electronics_classroom_ohm_revisit",
        });
        return;
      }

      this.movementLocked = true;
      this.clearPrompt();
      gameEvents.emit("dialogue:start", {
        dialogueId,
        speakerId,
        presentation: "portrait",
        beatId: "ohmdal_automaton_first_contact",
      });
      return;
    }

    if (target.payload?.targetWorldId === "ohmdal") {
      if (!hasCompletedNarrativeBeat("ohmdal_preview_memory_seen")) {
        gameEvents.emit("memory:start", {
          memoryId: "ohmdal_preview",
          beatId: "ohmdal_preview_memory_seen",
          source: "portal",
        });
        gameEvents.emit("analytics:track", {
          eventName: "viewed_ohmdal_preview",
          roomId: this.mapData.id,
          beatId: "ohmdal_preview_memory_seen",
        });
        return;
      }

      gameEvents.emit("message:show", {
        messageId: "electronics_classroom_portal_ready",
      });
      gameEvents.emit("narrative:beat-completed", {
        beatId: "ohmdal_first_puzzle_handoff",
        roomId: this.mapData.id,
      });
      gameEvents.emit("analytics:track", {
        eventName: "started_puzzle_after_narrative_bridge",
        roomId: this.mapData.id,
        beatId: "ohmdal_first_puzzle_handoff",
        puzzleId: "closed_circuit_001",
      });
      completeNarrativeBeat("ohmdal_first_puzzle_handoff");
      this.scene.start("ElectronicsThresholdScene");
      return;
    }

    const messageId = target.payload?.messageId;
    if (messageId) {
      gameEvents.emit("message:show", { messageId });
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
        return 0x26372f;
      case "shelf":
        return 0x5b4a2f;
      case "furniture":
        return 0x6c5638;
      case "gate":
        return 0x315044;
      default:
        return 0x34483d;
    }
  }

  private suppressInteractionBriefly() {
    this.suppressInteractUntil = this.time.now + 180;
  }

  private isInteractionSuppressed() {
    return this.time.now < this.suppressInteractUntil;
  }
}
