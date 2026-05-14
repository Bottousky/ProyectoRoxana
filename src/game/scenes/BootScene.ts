import * as Phaser from "phaser";
import { gameEvents } from "@/game/systems/eventBus";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    gameEvents.emit("scene:ready", { scene: "boot" });
    this.scene.start("PreloadScene");
  }
}
