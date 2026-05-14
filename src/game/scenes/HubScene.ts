import * as Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "@/game/constants";
import { Player } from "@/game/entities/Player";
import { RoxanaNpc } from "@/game/entities/RoxanaNpc";
import { gameEvents } from "@/game/systems/eventBus";
import type { DirectionVector } from "@/game/types/events";

type WasdKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  E: Phaser.Input.Keyboard.Key;
  SPACE: Phaser.Input.Keyboard.Key;
  ENTER: Phaser.Input.Keyboard.Key;
};

export class HubScene extends Phaser.Scene {
  private player?: Player;
  private roxana?: RoxanaNpc;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys?: WasdKeys;
  private movementLocked = false;
  private virtualDirection: DirectionVector = { x: 0, y: 0 };
  private promptVisible = false;
  private cleanupEventHandlers: Array<() => void> = [];

  constructor() {
    super("HubScene");
  }

  create() {
    this.drawPlaceholderRoom();

    this.player = new Player(this, 96, 112);
    this.roxana = new RoxanaNpc(this, 248, 108);

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.keys = this.input.keyboard?.addKeys(
      "W,A,S,D,E,SPACE,ENTER",
    ) as WasdKeys;

    this.cleanupEventHandlers = [
      gameEvents.on("dialogue:complete", () => {
        this.movementLocked = false;
      }),
      gameEvents.on("input:virtual-direction", (direction) => {
        this.virtualDirection = direction;
      }),
      gameEvents.on("input:interact", () => {
        this.tryStartRoxanaDialogue();
      }),
    ];

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.cleanupEventHandlers.forEach((cleanup) => cleanup());
      this.cleanupEventHandlers = [];
      gameEvents.emit("hud:prompt", null);
    });

    gameEvents.emit("scene:ready", { scene: "hub" });
  }

  update(_time: number, delta: number) {
    if (!this.player || !this.roxana) {
      return;
    }

    this.updateInteractionPrompt();

    if (this.movementLocked) {
      return;
    }

    if (this.wasInteractionPressed()) {
      this.tryStartRoxanaDialogue();
    }

    const direction = this.readMovementDirection();
    this.player.move(direction.x, direction.y, delta);
  }

  private drawPlaceholderRoom() {
    this.cameras.main.setBackgroundColor("#10141f");

    const floor = this.add.graphics();
    floor.fillStyle(0x182032, 1);
    floor.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    floor.lineStyle(1, 0x263247, 0.55);
    for (let x = 0; x <= GAME_WIDTH; x += TILE_SIZE) {
      floor.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y <= GAME_HEIGHT; y += TILE_SIZE) {
      floor.lineBetween(0, y, GAME_WIDTH, y);
    }

    floor.lineStyle(2, 0x5c6b85, 1);
    floor.strokeRect(8, 8, GAME_WIDTH - 16, GAME_HEIGHT - 16);

    this.add.rectangle(192, 34, 136, 16, 0x2b3445);
    this.add.rectangle(192, 182, 220, 10, 0x2b3445);
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

  private updateInteractionPrompt() {
    const isNearRoxana = this.isPlayerNearRoxana();

    if (isNearRoxana && !this.promptVisible && !this.movementLocked) {
      this.promptVisible = true;
      gameEvents.emit("hud:prompt", {
        message: "Hablar con Roxana",
      });
    }

    if ((!isNearRoxana || this.movementLocked) && this.promptVisible) {
      this.promptVisible = false;
      gameEvents.emit("hud:prompt", null);
    }
  }

  private wasInteractionPressed() {
    if (!this.keys) {
      return false;
    }

    return (
      Phaser.Input.Keyboard.JustDown(this.keys.E) ||
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE) ||
      Phaser.Input.Keyboard.JustDown(this.keys.ENTER)
    );
  }

  private tryStartRoxanaDialogue() {
    if (!this.isPlayerNearRoxana() || this.movementLocked) {
      return;
    }

    this.movementLocked = true;
    this.promptVisible = false;
    gameEvents.emit("hud:prompt", null);
    gameEvents.emit("dialogue:start", {
      dialogueId: "roxana_intro",
      speakerId: "roxana",
    });
  }

  private isPlayerNearRoxana() {
    if (!this.player || !this.roxana) {
      return false;
    }

    return (
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.roxana.x,
        this.roxana.y,
      ) < 36
    );
  }
}
