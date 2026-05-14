import * as Phaser from "phaser";
import { gameEvents } from "@/game/systems/eventBus";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  create() {
    gameEvents.emit("scene:ready", { scene: "preload" });
    this.scene.start("HubScene");
  }
}
